// renderer/components/individual/PrintableCard.tsx
import React, { useRef, useState } from 'react'
import { Button } from '@/renderer/components/ui/button'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

interface CardProps {
  data: {
    name?: string
    class?: string
    idNumber?: string
    issueDate?: string
  }
}

const PrintableCard = ({ data }: CardProps) => {
  const [generating, setGenerating] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleGeneratePDF = async () => {
    if (!cardRef.current) return
    setGenerating(true)

    try {
      // Render HTML to canvas
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
      })
      const imgData = canvas.toDataURL('image/png')

      // Create jsPDF with custom card size in mm: 85.6x53.98
      const pdf = new jsPDF({ unit: 'mm', format: [53.98, 85.6] })
      pdf.addImage(imgData, 'PNG', 0, 0, 85.6, 53.98)

      // Trigger download or send to main process
      pdf.save(`card_${data.name || 'unnamed'}_${data.idNumber || '??????'}.pdf`)
    } catch (err) {
      console.error('PDF generation failed:', err)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <>
      {/* Hidden card markup for PDF export */}
      <div
        ref={cardRef}
        className="print-area"
        style={{
          width: '85.6mm',
          height: '53.98mm',
          padding: '2mm',
          textAlign: 'center',
          position: 'absolute',
          top: '-9999px',
        }}
      >
        <div className="card front" style={{ background: 'linear-gradient(to bottom, #f0f4ff, #e6e9ff)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2mm' }}>
            <div style={{ fontSize: '8pt' }}>7</div>
            <div style={{ fontSize: '8pt' }}>7</div>
          </div>
          <h1 style={{ fontSize: '16pt', fontWeight: 'bold', margin: 0 }}>دولة ليبيا المجلس العسكري</h1>
          <h2 style={{ fontSize: '14pt', margin: '2mm 0' }}>لثوار مصراتة</h2>
          <div style={{ marginTop: '4mm', borderTop: '1px solid black', paddingTop: '2mm' }}>
            <p style={{ fontSize: '10pt', margin: 0 }}>صالحة لمدة سنة من تاريخ الإصدار</p>
            <p style={{ fontSize: '12pt', fontWeight: 'bold', margin: 0 }}>{data.issueDate}</p>
          </div>
        </div>
        <div className="card back" style={{ background: 'linear-gradient(to bottom, #ffffff, #f5f7ff)', position: 'relative', marginTop: '4mm' }}>
          <h1 style={{ fontSize: '16pt', fontWeight: 'bold', margin: 0 }}>دراسة تبسيط</h1>
          <h2 style={{ fontSize: '14pt', margin: '2mm 0' }}>المجلس العسكري</h2>
          <h3 style={{ fontSize: '12pt', margin: '2mm 0' }}>تأوير مصراتة</h3>
          <div style={{ marginTop: '4mm', textAlign: 'right', padding: '0 4mm' }}>
            <p style={{ fontSize: '10pt', margin: '1mm 0' }}><strong>الاسم:</strong> {data.name}</p>
            <p style={{ fontSize: '10pt', margin: '1mm 0' }}><strong>الصف:</strong> {data.class}</p>
            <p style={{ fontSize: '10pt', margin: '1mm 0' }}><strong>رقم التعريف:</strong> {data.idNumber}</p>
          </div>
          <div style={{ position: 'absolute', bottom: '2mm', left: 0, right: 0, textAlign: 'center' }}>
            <p style={{ fontSize: '8pt', margin: 0 }}>فصيلة الدم: 0</p>
          </div>
        </div>
      </div>

      {/* Generate PDF button */}
      <Button onClick={handleGeneratePDF} disabled={generating} className="font-din-bold text-sm">
        {generating ? 'جارٍ التحضير...' : 'تحميل/طباعة البطاقة'}
      </Button>
    </>
  )
}

export default PrintableCard;
