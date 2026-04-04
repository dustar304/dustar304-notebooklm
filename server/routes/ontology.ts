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

// 개체 추출(Node) 및 관계 정의(Edge) 알고리즘
function extractNodesAndEdges(tableName: string, row: any) {
  const nodes: any[] = []
  const edges: any[] = []
  
  // 1. Primary Node (Main Entity)
  // 고유 식별자가 될만한 컬럼 찾기 (우선순위: id -> _id, _cd, _no 로 끝나는 컬럼 -> 첫번째 값)
  const primaryIdCol = Object.keys(row).find(k => k === 'id') || 
                       Object.keys(row).find(k => k.endsWith('_id') || k.endsWith('_cd') || k.endsWith('_no'))
  
  const primaryId = primaryIdCol ? row[primaryIdCol] : Object.values(row)[0] || Math.random().toString()
  
  const primaryNode = {
    id: `${tableName}_${primaryId}`,
    label: tableName,
    properties: row
  }
  nodes.push(primaryNode)

  // 2. Related Entities (Foreign Keys / Attributes -> Nodes & Edges)
  for (const [key, value] of Object.entries(row)) {
    if (value === null || value === undefined || value === '') continue;
    
    // 외래키나 연관 엔티티로 추정되는 컬럼 (e.g. emp_id, item_cd, machine_cd, supplier_id 등)
    if (key !== primaryIdCol && typeof value === 'string' && (key.endsWith('_id') || key.endsWith('_cd') || key.endsWith('_no'))) {
      const targetLabel = key.replace(/_id$|_cd$|_no$/, '')
      const relatedNodeId = `${targetLabel}_${value}`
      
      const relatedNode = {
        id: relatedNodeId,
        label: targetLabel,
        properties: { [key]: value }
      }
      nodes.push(relatedNode)
      
      // Edge (Relation)
      edges.push({
        source: primaryNode.id,
        target: relatedNode.id,
        type: `HAS_${targetLabel.toUpperCase()}`,
        properties: { fromColumn: key }
      })
    } 
    // 예제 시나리오 대응: 불량(Defect), 결과(Result) 관련 키워드가 있을 경우 독립적인 Node/Edge로 분리
    else if (key.includes('defect') || key === 'result' || key === 'status') {
      const relatedNodeId = `${key}_${value}`
      nodes.push({
        id: relatedNodeId,
        label: key,
        properties: { value: value }
      })
      edges.push({
        source: primaryNode.id,
        target: relatedNodeId,
        type: `HAS_${key.toUpperCase()}`,
        properties: { fromColumn: key }
      })
    }
  }

  // Deduplicate nodes
  const uniqueNodes = Array.from(new Map(nodes.map(n => [n.id, n])).values())
  
  return { nodes: uniqueNodes, edges }
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

    // 2 & 3. Extract Nodes and Edges
    const graphData = rows.map((row: any) => {
      const { nodes, edges } = extractNodesAndEdges(tableName, row)
      return {
        originalRow: row,
        nodes,
        edges,
        metadata: {
          model: embeddingModel,
          vectorType: 'graph_representation',
          timestamp: new Date().toISOString()
        }
      }
    })

    // 4. JSON Caching (Distributed Graph DB Simulation)
    const cachePath = path.join(cacheDir, `${tableName}.json`)
    fs.writeFileSync(cachePath, JSON.stringify(graphData, null, 2), 'utf-8')

    res.json({ 
      success: true, 
      message: `Table ${tableName} successfully converted to graph and cached.`,
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

        const graphData = rows.map((row: any) => {
          const { nodes, edges } = extractNodesAndEdges(tableName, row)
          return {
            originalRow: row,
            nodes,
            edges,
            metadata: {
              model: embeddingModel,
              vectorType: 'graph_representation',
              timestamp: new Date().toISOString()
            }
          }
        })

        const cachePath = path.join(cacheDir, `${tableName}.json`)
        fs.writeFileSync(cachePath, JSON.stringify(graphData, null, 2), 'utf-8')
        
        successCount++
        totalDocs += rows.length
      } catch (err) {
        console.error(`Error converting ${tableName} to graph:`, err)
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
