import { Router } from 'express'
import { query } from '../db'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const router = Router()
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const cacheDir = path.join(__dirname, '../../uploads/vector_cache')

// Ensure cache directory exists
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true })
}

// Simple tokenizer
function tokenize(text: string): string[] {
  // Matches Korean characters, English words, and numbers
  const words = text.match(/[가-힣]+|[a-zA-Z0-9]+/g) || []
  return words.map(w => w.toLowerCase())
}

// Calculate TF
function calculateTF(tokens: string[]): Record<string, number> {
  const tf: Record<string, number> = {}
  if (tokens.length === 0) return tf

  tokens.forEach(token => {
    tf[token] = (tf[token] || 0) + 1
  })

  // Normalize by total terms
  for (const token in tf) {
    tf[token] = tf[token] / tokens.length
  }
  return tf
}

// Calculate IDF
function calculateIDF(documents: string[][]): Record<string, number> {
  const idf: Record<string, number> = {}
  const totalDocs = documents.length
  
  const documentSets = documents.map(doc => new Set(doc))
  
  const df: Record<string, number> = {}
  documentSets.forEach(set => {
    set.forEach(token => {
      df[token] = (df[token] || 0) + 1
    })
  })

  for (const token in df) {
    idf[token] = Math.log(totalDocs / (1 + df[token]))
  }
  return idf
}

// Get available tables
router.get('/tables', async (_req, res) => {
  try {
    const result = await query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
    `)
    
    const tables = result.map((r: any) => r.table_name)
    
    // Read cached files
    const cachedFiles = fs.existsSync(cacheDir) ? fs.readdirSync(cacheDir) : []
    const vectorizedTables = cachedFiles
      .filter(f => f.endsWith('.json'))
      .map(f => f.replace('.json', ''))

    res.json({
      available: tables,
      vectorized: vectorizedTables
    })
  } catch (error) {
    console.error('Failed to fetch tables:', error)
    res.status(500).json({ error: 'Failed to fetch tables' })
  }
})

// Vectorize a table
router.post('/vectorize', async (req, res) => {
  const { tableName, embeddingModel = 'TF-IDF' } = req.body

  if (!tableName) {
    return res.status(400).json({ error: 'Table name is required' })
  }

  try {
    // 1. Fetch table data
    const rows = await query(`SELECT * FROM ${tableName}`)
    
    if (rows.length === 0) {
      return res.status(400).json({ error: 'Table is empty' })
    }

    // 2. Convert to Long String (JSON Format)
    const documents = rows.map((row: any) => JSON.stringify(row))
    
    // 3. TF-IDF / Embedding
    const tokenizedDocs = documents.map((doc: string) => tokenize(doc))
    const idf = calculateIDF(tokenizedDocs)
    
    const vectorCache = rows.map((row: any, index: number) => {
      const tokens = tokenizedDocs[index]
      const tf = calculateTF(tokens)
      const tfidf: Record<string, number> = {}
      
      for (const token in tf) {
        tfidf[token] = tf[token] * (idf[token] || 0)
      }

      return {
        originalRow: row,
        documentString: documents[index],
        vector: tfidf, // TF-IDF representation
        metadata: {
          model: embeddingModel,
          vectorType: 'sparse',
          timestamp: new Date().toISOString()
        }
      }
    })

    // 4. JSON Caching
    const cachePath = path.join(cacheDir, `${tableName}.json`)
    fs.writeFileSync(cachePath, JSON.stringify(vectorCache, null, 2), 'utf-8')

    res.json({ 
      success: true, 
      message: `Table ${tableName} successfully vectorized and cached.`,
      documentCount: rows.length 
    })
  } catch (error) {
    console.error(`Failed to vectorize table ${tableName}:`, error)
    res.status(500).json({ error: `Failed to vectorize table ${tableName}` })
  }
})

// Vectorize ALL tables
router.post('/vectorize-all', async (req, res) => {
  const { embeddingModel = 'TF-IDF' } = req.body
  
  try {
    const result = await query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
    `)
    
    const tables = result.map((r: any) => r.table_name)
    let successCount = 0
    let totalDocs = 0

    for (const tableName of tables) {
      try {
        const rows = await query(`SELECT * FROM ${tableName}`)
        if (rows.length === 0) continue

        const documents = rows.map((row: any) => JSON.stringify(row))
        const tokenizedDocs = documents.map((doc: string) => tokenize(doc))
        const idf = calculateIDF(tokenizedDocs)
        
        const vectorCache = rows.map((row: any, index: number) => {
          const tokens = tokenizedDocs[index]
          const tf = calculateTF(tokens)
          const tfidf: Record<string, number> = {}
          
          for (const token in tf) {
            tfidf[token] = tf[token] * (idf[token] || 0)
          }

          return {
            originalRow: row,
            documentString: documents[index],
            vector: tfidf,
            metadata: {
              model: embeddingModel,
              vectorType: 'sparse',
              timestamp: new Date().toISOString()
            }
          }
        })

        const cachePath = path.join(cacheDir, `${tableName}.json`)
        fs.writeFileSync(cachePath, JSON.stringify(vectorCache, null, 2), 'utf-8')
        
        successCount++
        totalDocs += rows.length
      } catch (err) {
        console.error(`Error vectorizing ${tableName}:`, err)
      }
    }

    res.json({ 
      success: true, 
      message: `Successfully vectorized ${successCount} tables.`,
      tableCount: successCount,
      totalDocumentCount: totalDocs
    })
  } catch (error) {
    console.error('Failed to vectorize all tables:', error)
    res.status(500).json({ error: 'Failed to vectorize all tables' })
  }
})

// Get Cache stats
router.get('/stats', async (_req, res) => {
  try {
    const cachedFiles = fs.existsSync(cacheDir) ? fs.readdirSync(cacheDir).filter(f => f.endsWith('.json')) : []
    let totalDocs = 0
    let totalSize = 0
    let lastUpdated = new Date(0)

    cachedFiles.forEach(file => {
      const filePath = path.join(cacheDir, file)
      const stats = fs.statSync(filePath)
      totalSize += stats.size
      if (stats.mtime > lastUpdated) {
        lastUpdated = stats.mtime
      }
      
      try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        totalDocs += content.length
      } catch (e) {
        // Ignore parse errors
      }
    })

    res.json({
      vectorizedTablesCount: cachedFiles.length,
      totalDocuments: totalDocs,
      cacheSizeMB: (totalSize / (1024 * 1024)).toFixed(2),
      lastUpdated: lastUpdated.getTime() > 0 ? lastUpdated.toISOString() : null
    })
  } catch (error) {
    console.error('Failed to get stats:', error)
    res.status(500).json({ error: 'Failed to get stats' })
  }
})

export default router
