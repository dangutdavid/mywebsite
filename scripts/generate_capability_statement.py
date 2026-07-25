from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "downloads" / "skydive-capability-statement.pdf"


def para(text, style):
    return Paragraph(text, style)


def build_pdf():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        rightMargin=17 * mm,
        leftMargin=17 * mm,
        topMargin=16 * mm,
        bottomMargin=14 * mm,
        title="SkyDive Capability Statement",
        author="SkyDive Technologies and Consultancy Ltd",
    )

    base = getSampleStyleSheet()
    navy = colors.HexColor("#102235")
    teal = colors.HexColor("#087f82")
    slate = colors.HexColor("#4a5b68")
    mist = colors.HexColor("#eef7f5")
    line = colors.HexColor("#d8e3df")

    styles = {
        "title": ParagraphStyle(
            "Title",
            parent=base["Title"],
            fontName="Helvetica-Bold",
            fontSize=26,
            leading=29,
            textColor=navy,
            spaceAfter=8,
        ),
        "subtitle": ParagraphStyle(
            "Subtitle",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=10.5,
            leading=15,
            textColor=slate,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=11.5,
            leading=14,
            textColor=navy,
            spaceBefore=7,
            spaceAfter=5,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=9.2,
            leading=13,
            textColor=slate,
        ),
        "small": ParagraphStyle(
            "Small",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=8.2,
            leading=11,
            textColor=slate,
        ),
        "footer": ParagraphStyle(
            "Footer",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=8.2,
            leading=11,
            textColor=colors.white,
        ),
        "label": ParagraphStyle(
            "Label",
            parent=base["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=8.4,
            leading=11,
            textColor=teal,
        ),
    }

    story = []
    story.append(para("SkyDive", styles["title"]))
    story.append(
        para(
            "Salesforce, AI and data solutions built for real operating needs. "
            "Strategic advice and practical delivery from Dr Maren David Dangut Ph.D.",
            styles["subtitle"],
        )
    )
    story.append(Spacer(1, 7 * mm))

    summary = Table(
        [
            [
                para("<b>Company</b><br/>SkyDive Technologies and Consultancy Ltd<br/>Registered in England and Wales", styles["body"]),
                para("<b>Company number</b><br/>15086660", styles["body"]),
                para("<b>Location</b><br/>Milton Keynes, UK", styles["body"]),
            ]
        ],
        colWidths=[70 * mm, 45 * mm, 45 * mm],
    )
    summary.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), mist),
                ("BOX", (0, 0), (-1, -1), 0.6, line),
                ("INNERGRID", (0, 0), (-1, -1), 0.4, line),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    story.append(summary)

    story.append(para("Core Capability", styles["section"]))
    capabilities = [
        ["Salesforce engineering and architecture", "Apex, Lightning Web Components, Flow, secure data models, platform architecture, code review and maintainable implementation support."],
        ["AI and data solutions", "Agentforce, Einstein AI, Prompt Builder, Data Cloud/Data 360, machine-learning workflow design, governance and responsible AI guardrails."],
        ["Systems integration", "REST, SOAP, GraphQL, Platform Events, Change Data Capture, identity controls, API mapping and reliable data synchronisation."],
        ["Technical leadership and delivery", "Discovery, architecture governance, DevOps, mentoring, delivery assurance and senior stakeholder translation."],
    ]
    cap_table = Table([[para(f"<b>{name}</b>", styles["body"]), para(copy, styles["body"])] for name, copy in capabilities], colWidths=[52 * mm, 108 * mm])
    cap_table.setStyle(
        TableStyle(
            [
                ("BOX", (0, 0), (-1, -1), 0.6, line),
                ("INNERGRID", (0, 0), (-1, -1), 0.35, line),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    story.append(cap_table)

    story.append(para("Where SkyDive Fits", styles["section"]))
    fit = [
        "Salesforce programmes needing senior hands-on engineering and architecture review.",
        "Public sector, education, research and partner organisations improving connected digital services.",
        "Teams exploring practical AI and data workflows with governance, integration and adoption in mind.",
        "Delivery teams that need objective advice, technical mentoring or recovery support.",
    ]
    story.append(para("<br/>".join([f"- {item}" for item in fit]), styles["body"]))

    story.append(para("Typical Outputs", styles["section"]))
    outputs = Table(
        [
            [
                para("<b>Discovery and advisory</b><br/>Option appraisals, risk reviews, architecture notes, operating model recommendations.", styles["body"]),
                para("<b>Build and improve</b><br/>Salesforce components, automation, integrations, data workflows and implementation documentation.", styles["body"]),
            ],
            [
                para("<b>Assurance</b><br/>Code review, governance checks, release recommendations and maintainability guidance.", styles["body"]),
                para("<b>Enablement</b><br/>Workshops, mentoring, handover notes and practical team guidance.", styles["body"]),
            ],
        ],
        colWidths=[80 * mm, 80 * mm],
    )
    outputs.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.white),
                ("BOX", (0, 0), (-1, -1), 0.6, line),
                ("INNERGRID", (0, 0), (-1, -1), 0.35, line),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    story.append(outputs)

    story.append(para("Selected Technologies", styles["section"]))
    story.append(
        para(
            "Sales Cloud, Service Cloud, Experience Cloud, Data Cloud/Data 360, CPQ, Agentforce, "
            "Einstein AI, Apex, Lightning Web Components, Flow, SOQL, REST, GraphQL, Platform Events, "
            "Salesforce DX, Python, machine learning and CI/CD.",
            styles["body"],
        )
    )

    story.append(Spacer(1, 5 * mm))
    footer = Table(
        [
            [
                para("<b>Next step</b><br/>Book a project discussion through the website enquiry form.", styles["footer"]),
                para("<b>Website</b><br/>https://skydive-tech.vercel.app", styles["footer"]),
            ]
        ],
        colWidths=[80 * mm, 80 * mm],
    )
    footer.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), navy),
                ("TEXTCOLOR", (0, 0), (-1, -1), colors.white),
                ("BOX", (0, 0), (-1, -1), 0.6, navy),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    story.append(footer)

    doc.build(story)


if __name__ == "__main__":
    build_pdf()
    print(OUTPUT)
