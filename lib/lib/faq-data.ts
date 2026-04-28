export type FAQ = {
  question: string
  answer: string
}

export type FAQSection = {
  title: string
  icon: string
  faqs: FAQ[]
}

export const FAQ_SECTIONS: FAQSection[] = [
  {
    title: 'Before You File',
    icon: '📋',
    faqs: [
      { question: 'Do I need a lawyer to file a small claims case?', answer: 'No. Small claims court is specifically designed for people to represent themselves without an attorney. In fact, in California, attorneys are not allowed to represent parties in small claims court at all. SwiftClaim handles all the paperwork and filing so you never need legal representation.' },
      { question: 'How much can I sue for in small claims court?', answer: 'The maximum depends on your state. In California, the limit is $12,500 for individuals ($6,250 for businesses). In Texas, you can sue for up to $20,000. In Florida, the limit is $8,000. If your claim exceeds these amounts, you can either reduce it to the limit or file in a higher court.' },
      { question: 'What types of cases can I file?', answer: 'Small claims court handles monetary disputes only. Common cases include landlord/tenant disputes, breach of contract, property damage, defective products, unpaid wages, personal injury, and debt collection. You cannot use small claims to seek injunctions or non-monetary relief.' },
      { question: 'Can I file against a large corporation?', answer: 'Yes. You can sue any business of any size in small claims court — from a local contractor to Amazon, Airbnb, or a major airline. Large companies often settle small claims cases rather than send lawyers to court, which means filing a case frequently results in a settlement offer before your hearing date.' },
      { question: 'How do I know if I have a strong case?', answer: 'Strong cases have clear evidence of a monetary loss and an identifiable defendant who caused it. Judges look for documentation: contracts, receipts, photos, written communications. If you can show you\'re owed money and have evidence to back it up, you have a reasonable case. SwiftClaim\'s team reviews every filing to ensure it\'s properly documented.' },
      { question: 'What is service of process and why does it matter?', answer: 'Service of process is the official legal procedure of notifying the defendant that they\'ve been sued. It\'s a constitutional requirement — everyone has the right to know they\'re being sued before a hearing. Without proper service, your case can be dismissed. SwiftClaim handles service of process on your behalf using certified mail or a professional process server.' },
      { question: 'What is the statute of limitations?', answer: 'The statute of limitations is the deadline to file your case. Miss it and your case is dismissed regardless of merit. For breach of written contract, you typically have 4-6 years. For property damage and personal injury, usually 2-3 years. For landlord/tenant deposit disputes, typically 2 years. SwiftClaim automatically checks your deadline when you start a claim.' },
      { question: 'Should I send a demand letter before filing?', answer: 'Yes, and it often works. A formal demand letter puts the other party on notice that you\'re serious and often results in payment without going to court. Courts also look favorably on plaintiffs who attempted to resolve disputes before filing. SwiftClaim can prepare a professional demand letter as part of your filing package.' },
      { question: 'What is jurisdiction and how do I know where to file?', answer: 'Jurisdiction determines which court has authority over your case. Generally, you file where the defendant lives, where the business operates, or where the incident occurred. Filing in the wrong court can result in your case being transferred or dismissed. SwiftClaim automatically identifies the correct court based on your information.' },
      { question: 'Can I file as a business?', answer: 'Yes. Businesses can sue in small claims court, though the maximum amount may be lower in some states (e.g., $6,250 for California businesses vs $12,500 for individuals). If you\'re a sole proprietor, file as an individual. LLCs and corporations should file as the legal business entity.' },
      { question: 'What if I\'m not sure of the defendant\'s exact legal name or address?', answer: 'For businesses, search your state\'s Secretary of State database to find the registered legal name and agent for service. For individuals, you need a current address — the case can\'t proceed without it. If you know a business name but not the legal entity, SwiftClaim\'s team can help research the correct defendant information.' },
      { question: 'How much does it cost to file a small claims case?', answer: 'SwiftClaim charges a flat fee starting at $49 for our filing service. Court filing fees are separate and vary by state and claim amount — typically $30–$100. In California, filing fees range from $30–$75. In Texas, the JP court fee is $54. In Florida, fees range from $55–$300 depending on the claim amount. If you win, you can typically recover these fees from the defendant.' },
    ],
  },
  {
    title: 'Filing & The Process',
    icon: '⚖️',
    faqs: [
      { question: 'How does SwiftClaim work?', answer: 'You answer simple questions about your dispute — who you\'re suing, what happened, and how much you\'re owed. SwiftClaim\'s system prepares the correct court forms for your jurisdiction, files them with the court, and arranges service of process on the defendant. We then help you prepare for your hearing.' },
      { question: 'How long does the process take?', answer: 'From filing to hearing, most small claims cases take 30–90 days depending on the court\'s calendar. Filing and service of process typically takes 1–2 weeks. The court then schedules your hearing, which usually takes another 4–8 weeks. SwiftClaim keeps you updated at every stage.' },
      { question: 'What happens after I file?', answer: 'After filing, the court issues a case number and a hearing date. The defendant is served with a copy of your claim and a summons to appear. Both parties gather evidence. SwiftClaim helps you organize your evidence and prepare your presentation for the judge.' },
      { question: 'Can I save my progress and come back later?', answer: 'Yes. SwiftClaim automatically saves your progress at every step. If you leave mid-filing, we\'ll send you reminder emails to help you finish. Your claim data is securely stored and accessible through your account.' },
      { question: 'What if the defendant cannot be found?', answer: 'If the process server cannot locate the defendant at the address provided, they make additional attempts. If the defendant remains unfound, the court may allow alternative service methods like posting the notice at their last known address. SwiftClaim guides you through this process.' },
      { question: 'Can I file if I live in a different state than the defendant?', answer: 'Generally, you must file where the defendant lives or where the incident occurred — not where you live. For online transactions, the rules vary. SwiftClaim identifies the correct filing jurisdiction based on your specific situation.' },
      { question: 'What is e-filing and is it available?', answer: 'E-filing means submitting your court documents electronically rather than mailing paper forms or visiting the courthouse in person. SwiftClaim uses e-filing wherever available — California, Texas, and Florida all have e-filing systems, so your case is filed instantly without any delays.' },
      { question: 'What if I need to change or update my filing?', answer: 'After filing, amendments require a motion and may incur additional court fees. This is why it\'s important to review all information carefully before submitting. SwiftClaim has a thorough review step before any filing is submitted.' },
    ],
  },
  {
    title: 'Your Hearing',
    icon: '🏛️',
    faqs: [
      { question: 'What happens at the small claims hearing?', answer: 'Both parties present their case to a judge, usually in 10–15 minutes each. You explain what happened, show your evidence, and answer the judge\'s questions. The defendant does the same. The judge may decide immediately or take the matter under submission and mail you the decision.' },
      { question: 'How should I prepare for court?', answer: 'Organize your evidence in chronological order. Prepare a clear, concise summary of your case. Practice explaining what happened in 3–4 sentences. Bring all supporting documents, photos, contracts, and receipts in duplicate. Dress professionally. Arrive early. Be respectful to the judge.' },
      { question: 'What if the defendant doesn\'t show up?', answer: 'If the defendant was properly served and doesn\'t appear, you may receive a default judgment — but you still need to present your evidence to the judge. Don\'t assume victory just because they didn\'t come. Present your case fully and let the judge rule.' },
      { question: 'Can I bring witnesses?', answer: 'Yes. Witnesses can testify on your behalf. If a witness won\'t come voluntarily, you can request a subpoena from the court. SwiftClaim can help you prepare witness questions and organize your presentation.' },
      { question: 'What if I can\'t attend my hearing date?', answer: 'You can request a continuance (postponement) from the court. Do this as far in advance as possible and provide a legitimate reason. Courts usually grant one continuance per party. Failing to appear without requesting a continuance typically results in your case being dismissed.' },
      { question: 'Who decides whether I win or lose?', answer: 'A judge — or sometimes a court commissioner who has the same authority. Small claims courts do not use juries. The judge listens to both sides, reviews the evidence, and applies the law to decide who prevails and for how much.' },
      { question: 'What is a pre-trial conference?', answer: 'Some courts, especially in Florida, require a pre-trial conference before the actual hearing. This is a meeting where both sides discuss the case with a mediator or judge, often resulting in settlement. If no settlement is reached, the case proceeds to a hearing.' },
      { question: 'Can I appeal a small claims decision?', answer: 'Yes, but appeals are limited and must be filed within a short window (usually 30 days). You must show the judge made a legal error, not just that you disagree with the outcome. Appeals go to a higher court and may involve attorneys. Most small claims decisions are final in practice.' },
    ],
  },
  {
    title: 'After You Win',
    icon: '🏆',
    faqs: [
      { question: 'What happens if I win?', answer: 'The court issues a money judgment in your favor. However, the court does not collect the money for you — that\'s your responsibility. Common collection methods include wage garnishment, bank levies, and property liens. SwiftClaim provides a guide to collecting your judgment.' },
      { question: 'What if the defendant won\'t pay after I win?', answer: 'A judgment doesn\'t mean automatic payment. You can garnish wages (take a percentage from their paycheck), levy bank accounts, or place a lien on property. These require additional court filings but are powerful collection tools. Judgments remain valid for years.' },
      { question: 'How long does a judgment stay valid?', answer: 'In California, judgments are valid for 10 years and can be renewed. Texas and Florida have similar rules. As long as the judgment is active, you can pursue collection efforts at any time.' },
      { question: 'What if the defendant has no money or assets?', answer: 'A judgment against someone with no collectible assets is sometimes called a "paper judgment." However, circumstances change — people get jobs, inherit money, or acquire assets. You can renew the judgment and pursue collection when their situation improves.' },
      { question: 'Can the defendant countersue me?', answer: 'Yes. In small claims court, defendants can file a counterclaim against you at the same time as your hearing. If their counterclaim exceeds the small claims limit, the case may be transferred to a higher court. SwiftClaim helps you understand any counterclaim you receive.' },
      { question: 'What if we settle before the hearing?', answer: 'Settlement is a great outcome — you get paid without a hearing. Make sure any settlement is in writing and specifies the payment amount, timeline, and what happens if they don\'t pay. Once you receive payment, file a dismissal with the court.' },
    ],
  },
  {
    title: 'Privacy & Security',
    icon: '🔒',
    faqs: [
      { question: 'Is my data secure with SwiftClaim?', answer: 'Yes. SwiftClaim uses industry-standard encryption for all data in transit and at rest. We use Supabase with row-level security, meaning your data is only ever accessible by you. We never sell your personal information to third parties.' },
      { question: 'Can I hide my address from the defendant?', answer: 'Unfortunately, court filings are public record and typically include your address. There is no legal mechanism to hide your address from the defendant in small claims court — they have the right to know who is suing them. Consider using a P.O. box if privacy is a concern.' },
      { question: 'Is SwiftClaim my lawyer?', answer: 'No. SwiftClaim is a legal document preparation service, not a law firm. We do not provide legal advice, and no attorney-client relationship is formed. SwiftClaim helps you prepare and file the correct documents — just as a tax preparer helps with tax forms but is not your accountant.' },
      { question: 'Why do you need my signature?', answer: 'Your signature authorizes SwiftClaim to submit documents to the court on your behalf and attests that the information in your filing is accurate. Court filings require a verified signature — this is a standard legal requirement, not something SwiftClaim invented.' },
    ],
  },
]
