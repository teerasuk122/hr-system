import { NextRequest, NextResponse } from "next/server"

// AI Team configuration
const AI_TEAM = {
  max: {
    id: "max",
    name: "พี่มักซ์",
    emoji: "🖥️",
    color: "blue",
    role: "ผู้นำทีม AI",
    greeting: "สวัสดีครับ! พี่มักซ์พร้อมช่วยเหลือคุณแล้วครับ",
  },
  port: {
    id: "port",
    name: "น้องพอร์ต",
    emoji: "🎨",
    color: "pink",
    role: "UI/UX Specialist",
    greeting: "สวัสดีค่ะ! น้องพอร์ตพร้อมช่วยเรื่องดีไซน์ค่ะ",
  },
  gemini: {
    id: "gemini",
    name: "เจมินี่",
    emoji: "💎",
    color: "purple",
    role: "Research & Analysis",
    greeting: "สวัสดีครับ! เจมินี่พร้อมช่วยวิเคราะห์ข้อมูลครับ",
  },
}

// Simulated responses based on context
function generateResponse(aiId: string, message: string): string {
  const ai = AI_TEAM[aiId as keyof typeof AI_TEAM]
  if (!ai) {
    return "ไม่พบ AI ที่ระบุ"
  }

  const lowerMessage = message.toLowerCase()

  // HR-related queries
  if (lowerMessage.includes("พนักงาน") || lowerMessage.includes("employee")) {
    if (aiId === "max") {
      return "ผมช่วยจัดการข้อมูลพนักงานได้ครับ คุณต้องการดูรายชื่อพนักงาน เพิ่มพนักงานใหม่ หรือแก้ไขข้อมูลครับ?"
    } else if (aiId === "port") {
      return "น้องพอร์ตช่วยออกแบบหน้าจอพนักงานได้ค่ะ จะปรับ layout หรือเพิ่ม feature อะไรไหมคะ?"
    } else {
      return "เจมินี่วิเคราะห์ข้อมูลพนักงานได้ครับ เช่น สถิติการลา อัตราการเข้างาน หรือ performance"
    }
  }

  // Leave-related queries
  if (lowerMessage.includes("ลา") || lowerMessage.includes("leave")) {
    if (aiId === "max") {
      return "ระบบการลามี 3 ประเภท: ลาป่วย ลากิจ และลาพักร้อน คุณต้องการดำเนินการอะไรครับ?"
    } else if (aiId === "port") {
      return "น้องพอร์ตช่วยปรับ UI ของระบบการลาได้ค่ะ จะเพิ่ม calendar view หรือ approval workflow ไหมคะ?"
    } else {
      return "เจมินี่วิเคราะห์แนวโน้มการลาได้ครับ พบว่าช่วงเทศกาลมีการลาเพิ่มขึ้น 40%"
    }
  }

  // Attendance-related queries
  if (lowerMessage.includes("เวลา") || lowerMessage.includes("เข้างาน") || lowerMessage.includes("attendance")) {
    if (aiId === "max") {
      return "ผมดูข้อมูลเวลาเข้างานได้ครับ วันนี้มีพนักงานเข้างานแล้ว 42 คน จาก 45 คน (93%)"
    } else if (aiId === "port") {
      return "น้องพอร์ตทำ dashboard เวลาเข้างานให้แล้วค่ะ มี stats และ table แสดงผลสวยๆ"
    } else {
      return "เจมินี่พบว่าพนักงานส่วนใหญ่เข้างานเฉลี่ย 08:45 น. มีความตรงต่อเวลา 95%"
    }
  }

  // Meeting-related queries
  if (lowerMessage.includes("ประชุม") || lowerMessage.includes("meeting")) {
    if (aiId === "max") {
      return "วันนี้มีการประชุม 5 รายการครับ รายการถัดไปคือ Team Planning เวลา 14:00 น."
    } else if (aiId === "port") {
      return "น้องพอร์ตทำหน้าจัดการประชุมให้แล้วค่ะ มี calendar view และ booking system"
    } else {
      return "เจมินี่วิเคราะห์ว่าทีมใช้เวลาประชุมเฉลี่ยสัปดาห์ละ 8 ชั่วโมง/คน"
    }
  }

  // Accounting-related queries
  if (lowerMessage.includes("เงินเดือน") || lowerMessage.includes("payroll") || lowerMessage.includes("บัญชี")) {
    if (aiId === "max") {
      return "ระบบบัญชีพร้อมใช้งานครับ คุณต้องการดูรายงานเงินเดือน หรือค่าใช้จ่ายไหมครับ?"
    } else if (aiId === "port") {
      return "น้องพอร์ตทำ dashboard บัญชีให้แล้วค่ะ มี chart แสดงรายรับรายจ่าย"
    } else {
      return "เจมินี่วิเคราะห์ว่าค่าใช้จ่ายด้าน HR คิดเป็น 35% ของงบประมาณทั้งหมด"
    }
  }

  // Default greeting/help
  if (lowerMessage.includes("สวัสดี") || lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
    return ai.greeting
  }

  // Default response
  return `${ai.name} ${ai.emoji} พร้อมช่วยเหลือคุณครับ! ถามเรื่อง HR, การลา, เวลาเข้างาน, ประชุม หรือบัญชีได้เลยครับ`
}

// GET - List available AI
export async function GET() {
  return NextResponse.json({
    success: true,
    ai_team: Object.values(AI_TEAM),
    message: "AI Team พร้อมให้บริการ",
  })
}

// POST - Send message to AI
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, aiId = "max" } = body

    if (!message) {
      return NextResponse.json(
        { success: false, error: "กรุณาระบุข้อความ" },
        { status: 400 }
      )
    }

    const ai = AI_TEAM[aiId as keyof typeof AI_TEAM]
    if (!ai) {
      return NextResponse.json(
        { success: false, error: "ไม่พบ AI ที่ระบุ" },
        { status: 404 }
      )
    }

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 500))

    const response = generateResponse(aiId, message)

    return NextResponse.json({
      success: true,
      data: {
        id: Date.now().toString(),
        ai: {
          id: ai.id,
          name: ai.name,
          emoji: ai.emoji,
          color: ai.color,
        },
        message: response,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Chat API Error:", error)
    return NextResponse.json(
      { success: false, error: "เกิดข้อผิดพลาดในการประมวลผล" },
      { status: 500 }
    )
  }
}
