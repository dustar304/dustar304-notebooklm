import { Router } from 'express'
import { query } from '../db'

const router = Router()

// AIDATAVISION 테이블 초기화
export async function initFactoryTables() {
  const { pool } = await import('../db')
  const client = await pool.connect()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS item_mst (
        item_cd VARCHAR(40) PRIMARY KEY,
        item_name VARCHAR(60) NOT NULL,
        std VARCHAR(60),
        unit_cd VARCHAR(5)
      );
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS emp_mst (
        emp_id VARCHAR(10) PRIMARY KEY,
        emp_name VARCHAR(20) NOT NULL,
        dept_name VARCHAR(30)
      );
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS work_performances (
        id SERIAL PRIMARY KEY,
        work_order_no VARCHAR(20) NOT NULL,
        item_cd VARCHAR(40) REFERENCES item_mst(item_cd),
        emp_id VARCHAR(10) REFERENCES emp_mst(emp_id),
        work_date TIMESTAMP DEFAULT NOW(),
        plan_qty INTEGER DEFAULT 0,
        prod_qty INTEGER DEFAULT 0,
        bad_qty INTEGER DEFAULT 0,
        status VARCHAR(10) DEFAULT 'RUNNING'
      );
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS ai_vision_logs (
        id SERIAL PRIMARY KEY,
        work_performance_id INTEGER REFERENCES work_performances(id),
        barcode VARCHAR(50),
        scan_time TIMESTAMP DEFAULT NOW(),
        result VARCHAR(2) NOT NULL,
        defect_type VARCHAR(20),
        confidence_score DECIMAL(5,2),
        image_url TEXT,
        overlay_url TEXT,
        camera_ip VARCHAR(20),
        processing_time_ms INTEGER
      );
    `)

    console.log('📦 스마트팩토리 테이블 준비 완료')
  } finally {
    client.release()
  }
}

// POST /api/seed — 데모 데이터 생성
router.post('/seed', async (req, res) => {
  try {
    await query(
      `INSERT INTO item_mst (item_cd, item_name, std, unit_cd) VALUES
        ('PART-001', '자동차 엔진 피스톤 A', 'Aluminum Alloy', 'EA'),
        ('PART-002', '브레이크 패드 V2', 'Ceramic Composite', 'EA'),
        ('PART-003', '전조등 하우징', 'Polycarbonate', 'EA')
       ON CONFLICT DO NOTHING`
    )

    await query(
      `INSERT INTO emp_mst (emp_id, emp_name, dept_name) VALUES
        ('EMP-001', '김철수', '생산1팀'),
        ('EMP-002', '이영희', '품질관리팀')
       ON CONFLICT DO NOTHING`
    )

    const perfResult = await query(
      `INSERT INTO work_performances (work_order_no, item_cd, emp_id, plan_qty, prod_qty, bad_qty, status)
       VALUES ('WO-20250313-01', 'PART-001', 'EMP-001', 1000, 0, 0, 'RUNNING')
       RETURNING id`
    )
    const performanceId = perfResult[0].id

    const defectTypes = ['Normal', 'Crack', 'Scratch', 'Dent', 'Stain']
    const values: string[] = []
    const params: any[] = []
    let paramIdx = 1

    for (let i = 0; i < 50; i++) {
      const isDefect = Math.random() < 0.15
      const type = isDefect ? defectTypes[Math.floor(Math.random() * 4) + 1] : 'Normal'
      const scanTime = new Date(Date.now() - i * 60000)

      values.push(
        `($${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++})`
      )
      params.push(
        performanceId,
        `BC-${Date.now()}-${i}`,
        isDefect ? 'NG' : 'OK',
        isDefect ? type : null,
        +(Math.random() * (99.9 - 85.0) + 85.0).toFixed(2),
        isDefect
          ? 'https://placehold.co/600x400/ff0000/white?text=Defect+Detected'
          : 'https://placehold.co/600x400/00ff00/white?text=OK',
        Math.floor(Math.random() * 200) + 50
      )
    }

    await query(
      `INSERT INTO ai_vision_logs (work_performance_id, barcode, result, defect_type, confidence_score, image_url, processing_time_ms)
       VALUES ${values.join(', ')}`,
      params
    )

    res.json({ message: 'Sample data created successfully', performanceId })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to seed data', error: String(error) })
  }
})

// GET /api/vision/logs
router.get('/vision/logs', async (_req, res) => {
  try {
    const rows = await query(
      `SELECT l.id, l.scan_time as time, l.barcode, l.result, l.defect_type as "defectType",
              l.confidence_score as confidence, l.image_url as image, i.item_name as "itemName"
       FROM ai_vision_logs l
       LEFT JOIN work_performances w ON l.work_performance_id = w.id
       LEFT JOIN item_mst i ON w.item_cd = i.item_cd
       ORDER BY l.scan_time DESC LIMIT 50`
    )
    res.json(rows)
  } catch (error) {
    console.error('[GET /api/vision/logs]', error)
    res.status(500).json({ message: 'Error fetching logs', error: String(error) })
  }
})

// GET /api/vision/stats
router.get('/vision/stats', async (_req, res) => {
  try {
    const totalResult = await query(`SELECT count(*) as count FROM ai_vision_logs`)
    const ngResult = await query(`SELECT count(*) as count FROM ai_vision_logs WHERE result = 'NG'`)
    const distResult = await query(
      `SELECT defect_type as type, count(*) as count FROM ai_vision_logs WHERE result = 'NG' GROUP BY defect_type`
    )
    const trendResult = await query(
      `SELECT scan_time as time, result FROM ai_vision_logs ORDER BY scan_time DESC LIMIT 20`
    )

    const total = parseInt(totalResult[0].count)
    const ng = parseInt(ngResult[0].count)

    res.json({
      total,
      ng,
      ok: total - ng,
      distribution: distResult,
      trend: trendResult,
    })
  } catch (error) {
    console.error('[GET /api/vision/stats]', error)
    res.status(500).json({ message: 'Error fetching stats', error: String(error) })
  }
})

// POST /api/work-results
router.post('/work-results', async (req, res) => {
  try {
    const { formData, details } = req.body
    if (!details || details.length === 0) {
      return res.status(400).json({ message: '저장할 상세내역이 없습니다.' })
    }

    const savedIds: number[] = []

    for (const detail of details) {
      if (!detail.itemCd) continue

      await query(
        `INSERT INTO item_mst (item_cd, item_name, std, unit_cd) VALUES ($1, $2, $3, 'EA') ON CONFLICT DO NOTHING`,
        [detail.itemCd, detail.itemName || detail.itemCd, detail.std || null]
      )

      const empId = formData.mainEmpId || null
      if (empId) {
        await query(
          `INSERT INTO emp_mst (emp_id, emp_name, dept_name) VALUES ($1, $1, '미지정') ON CONFLICT DO NOTHING`,
          [empId]
        )
      }

      const result = await query(
        `INSERT INTO work_performances (work_order_no, item_cd, emp_id, work_date, plan_qty, prod_qty, bad_qty, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
        [
          formData.workOrderNo || `WO-${Date.now()}`,
          detail.itemCd,
          empId,
          formData.prcActDt ? new Date(formData.prcActDt) : new Date(),
          detail.prcRealQty || 0,
          detail.prcRealQty || 0,
          detail.badQty || 0,
          formData.isEnd === 'Y' ? 'FINISH' : 'RUNNING',
        ]
      )
      savedIds.push(result[0].id)
    }

    res.json({ message: '저장 완료', savedCount: savedIds.length, ids: savedIds })
  } catch (error) {
    console.error('[POST /api/work-results]', error)
    res.status(500).json({ message: '저장 실패', error: String(error) })
  }
})

// GET /api/work-results
router.get('/work-results', async (req, res) => {
  try {
    const rows = await query(
      `SELECT w.id, w.work_order_no as "workOrderNo", w.item_cd as "itemCd",
              i.item_name as "itemName", i.std, w.emp_id as "empId",
              e.emp_name as "empName", w.work_date as "workDate",
              w.prod_qty as "prodQty", w.bad_qty as "badQty", w.status
       FROM work_performances w
       LEFT JOIN item_mst i ON w.item_cd = i.item_cd
       LEFT JOIN emp_mst e ON w.emp_id = e.emp_id
       ORDER BY w.work_date DESC LIMIT 100`
    )
    res.json(rows)
  } catch (error) {
    console.error('[GET /api/work-results]', error)
    res.status(500).json({ message: '조회 실패', error: String(error) })
  }
})

export default router
