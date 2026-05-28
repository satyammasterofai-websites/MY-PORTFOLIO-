const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

async function generatePDF() {
  console.log('Generating Resume PDF...');
  const pdfDoc = await PDFDocument.create();
  
  // Standard Letter size (612 x 792 points)
  const pageWidth = 612;
  const pageHeight = 792;
  const page = pdfDoc.addPage([pageWidth, pageHeight]);

  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Define colors
  const sidebarColor = rgb(74/255, 93/255, 118/255); // Slate/Blue
  const white = rgb(1, 1, 1);
  const darkGray = rgb(0.15, 0.2, 0.25);
  const textColor = rgb(0.2, 0.2, 0.2);

  // Draw Sidebar background
  page.drawRectangle({
    x: 0,
    y: 0,
    width: 200,
    height: pageHeight,
    color: sidebarColor,
  });

  // Try to load and embed photo
  let imageEmbedded = false;
  try {
    const profilePath = path.join(process.cwd(), 'public', 'profile.jpg');
    if (fs.existsSync(profilePath)) {
      const imageBytes = fs.readFileSync(profilePath);
      let image;
      try {
        image = await pdfDoc.embedJpg(imageBytes);
      } catch (err) {
        console.log('JPG embed failed, trying PNG embed...');
        image = await pdfDoc.embedPng(imageBytes);
      }
      const imgWidth = 110;
      const imgHeight = 110;
      const imgX = (200 - imgWidth) / 2;
      const imgY = pageHeight - 160;

      // Draw the profile picture
      page.drawImage(image, {
        x: imgX,
        y: imgY,
        width: imgWidth,
        height: imgHeight,
      });
      imageEmbedded = true;
    }
  } catch (error) {
    console.warn('Could not embed profile picture:', error.message);
  }

  // If no image is embedded, draw a beautiful styled placeholder
  if (!imageEmbedded) {
    const radius = 55;
    const centerX = 100;
    const centerY = pageHeight - 105;
    // Draw solid circle border
    page.drawCircle({
      x: centerX,
      y: centerY,
      radius: radius,
      color: white,
    });
    // Draw inner circle
    page.drawCircle({
      x: centerX,
      y: centerY,
      radius: radius - 3,
      color: sidebarColor,
    });
    // Draw initial text "SV"
    const initials = 'SV';
    const initSize = 32;
    const initWidth = fontBold.widthOfTextAtSize(initials, initSize);
    page.drawText(initials, {
      x: centerX - initWidth / 2,
      y: centerY - initSize / 3,
      size: initSize,
      font: fontBold,
      color: white,
    });
  }

  // Draw CONTACT content
  let currentY = pageHeight - 210;

  // Header "CONTACT"
  page.drawText('CONTACT', {
    x: 20,
    y: currentY,
    size: 14,
    font: fontBold,
    color: white,
  });
  currentY -= 20;

  // Thin line under CONTACT
  page.drawLine({
    start: { x: 20, y: currentY },
    end: { x: 180, y: currentY },
    thickness: 1,
    color: rgb(1, 1, 1, 0.4),
  });
  currentY -= 25;

  // Contact Info fields
  const contactInfo = [
    { label: 'PHONE', value: '9456411569,\n9286937357' },
    { label: 'EMAIL', value: 'satyamvermag3@gmail.com' },
    { label: 'ADDRESS', value: 'Kamal vihar colony,\nNawada road,\nSaharanpur (Up)\n2470001' },
    { label: 'PORTFOLIO', value: 'my-portfolio-satyamverma.vercel.app' }
  ];

  for (const item of contactInfo) {
    page.drawText(item.label, {
      x: 20,
      y: currentY,
      size: 9,
      font: fontBold,
      color: rgb(0.9, 0.9, 0.9),
    });
    currentY -= 14;

    const valLines = item.value.split('\n');
    for (const valLine of valLines) {
      page.drawText(valLine, {
        x: 20,
        y: currentY,
        size: 9,
        font: fontRegular,
        color: white,
      });
      currentY -= 13;
    }
    currentY -= 10;
  }

  // LANGUAGES section
  currentY -= 10;
  page.drawText('LANGUAGES', {
    x: 20,
    y: currentY,
    size: 14,
    font: fontBold,
    color: white,
  });
  currentY -= 20;

  page.drawLine({
    start: { x: 20, y: currentY },
    end: { x: 180, y: currentY },
    thickness: 1,
    color: rgb(1, 1, 1, 0.4),
  });
  currentY -= 25;

  const languages = ['Hindi', 'English'];
  for (const lang of languages) {
    page.drawText(lang, {
      x: 20,
      y: currentY,
      size: 10,
      font: fontRegular,
      color: white,
    });
    currentY -= 18;
  }


  // ==========================================
  // RIGHT CONTENT PANE
  // ==========================================
  let rightY = pageHeight - 65;
  const leftMargin = 230;
  const rightWidth = pageWidth - leftMargin - 30; // ~352 points wide

  // Draw Name
  page.drawText('SATYAM VERMA', {
    x: leftMargin,
    y: rightY,
    size: 28,
    font: fontBold,
    color: darkGray,
  });
  rightY -= 25;

  // Draw Subtitle
  page.drawText('AI LEARNER', {
    x: leftMargin,
    y: rightY,
    size: 13,
    font: fontBold,
    color: rgb(118/255, 146/255, 180/255),
  });
  
  // Draw nice accent line under name/title
  rightY -= 18;
  page.drawLine({
    start: { x: leftMargin, y: rightY },
    end: { x: pageWidth - 30, y: rightY },
    thickness: 1.5,
    color: sidebarColor,
  });
  rightY -= 25;

  // Helper to wrap text
  function wrapText(text, maxWidth, font, fontSize) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (let word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const width = font.widthOfTextAtSize(testLine, fontSize);
      if (width > maxWidth) {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  // Draw sections
  function drawSectionHeader(title) {
    page.drawText(title, {
      x: leftMargin,
      y: rightY,
      size: 12,
      font: fontBold,
      color: darkGray,
    });
    rightY -= 8;
    page.drawLine({
      start: { x: leftMargin, y: rightY },
      end: { x: pageWidth - 30, y: rightY },
      thickness: 0.5,
      color: rgb(0.8, 0.8, 0.8),
    });
    rightY -= 16;
  }

  // 1. ABOUT ME
  drawSectionHeader('ABOUT ME');
  const aboutText = "To work in an organization where I can acquire new knowledge, sharpen my skills, and put my best efforts into achieving organizational and individual goals.";
  const wrappedAbout = wrapText(aboutText, rightWidth, fontRegular, 9.5);
  for (const line of wrappedAbout) {
    page.drawText(line, {
      x: leftMargin,
      y: rightY,
      size: 9.5,
      font: fontRegular,
      color: rgb(0.3, 0.3, 0.3),
    });
    rightY -= 14;
  }
  rightY -= 15;

  // 2. EXPERIENCE
  drawSectionHeader('EXPERIENCE');
  const experienceList = [
    "Working as a computer operator in CYBERCAFE.",
    "Worked as a Web developer for local Businesses.",
    "Worked as an AI and Promotional Video editor for local shops.",
    "Worked as an INVITATION VIDEO designer."
  ];
  for (const exp of experienceList) {
    // Bullet color
    page.drawCircle({
      x: leftMargin + 4,
      y: rightY + 3.5,
      radius: 2.5,
      color: sidebarColor,
    });
    const wrappedExp = wrapText(exp, rightWidth - 15, fontRegular, 9.5);
    for (let i = 0; i < wrappedExp.length; i++) {
      page.drawText(wrappedExp[i], {
        x: leftMargin + 15,
        y: rightY,
        size: 9.5,
        font: fontRegular,
        color: rgb(0.3, 0.3, 0.3),
      });
      rightY -= 14;
    }
    rightY -= 4;
  }
  rightY -= 15;

  // 3. EDUCATION QUALIFICATION
  drawSectionHeader('EDUCATION QUALIFICATION');
  const educationList = [
    "High School from CBSE Board by scoring 85.6% in 2024.",
    "Appearing for Intermediate from CBSE Board with expectation of 90+."
  ];
  for (const edu of educationList) {
    page.drawCircle({
      x: leftMargin + 4,
      y: rightY + 3.5,
      radius: 2.5,
      color: sidebarColor,
    });
    const wrappedEdu = wrapText(edu, rightWidth - 15, fontRegular, 9.5);
    for (let i = 0; i < wrappedEdu.length; i++) {
      page.drawText(wrappedEdu[i], {
        x: leftMargin + 15,
        y: rightY,
        size: 9.5,
        font: fontRegular,
        color: rgb(0.3, 0.3, 0.3),
      });
      rightY -= 14;
    }
    rightY -= 4;
  }
  rightY -= 15;

  // 4. OTHER QUALIFICATION
  drawSectionHeader('OTHER QUALIFICATION');
  const otherList = [
    "Prompt Engineering course by SWAYAN Plus.",
    "Masters in Claude AI, ChatGPT, Canva, PicsArt, ElevenLabs, Firebase, Vercel, Google AI Studio, CapCut, VN Editor."
  ];
  for (const other of otherList) {
    page.drawCircle({
      x: leftMargin + 4,
      y: rightY + 3.5,
      radius: 2.5,
      color: sidebarColor,
    });
    const wrappedOther = wrapText(other, rightWidth - 15, fontRegular, 9.5);
    for (let i = 0; i < wrappedOther.length; i++) {
      page.drawText(wrappedOther[i], {
        x: leftMargin + 15,
        y: rightY,
        size: 9.5,
        font: fontRegular,
        color: rgb(0.3, 0.3, 0.3),
      });
      rightY -= 14;
    }
    rightY -= 4;
  }
  rightY -= 15;

  // 5. SKILLS
  drawSectionHeader('SKILLS');
  const skillsList = [
    "CYBERCAFE WORKS.",
    "WEB DEVELOPER.",
    "PROMPT ENGINEER."
  ];
  for (const skill of skillsList) {
    page.drawCircle({
      x: leftMargin + 4,
      y: rightY + 3.5,
      radius: 2.5,
      color: sidebarColor,
    });
    page.drawText(skill, {
      x: leftMargin + 15,
      y: rightY,
      size: 9.5,
      font: fontRegular,
      color: rgb(0.3, 0.3, 0.3),
    });
    rightY -= 16;
  }

  // Save the PDF
  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(process.cwd(), 'public', 'resume.pdf');
  
  // Ensure public directory exists
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, pdfBytes);
  console.log('Resume PDF generated successfully at:', outputPath);
}

generatePDF().catch((err) => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
