export type County = {
  name: string
  slug: string
  court: string
  filingFee: string
  maxAmount: string
  eFilingAvailable: boolean
  address: string
  phone: string
  hours: string
  notes: string
}

export type StateData = {
  code: string
  name: string
  maxAmount: string
  filingFeeRange: string
  eFilingPortal: string
  generalNotes: string
  counties: County[]
}

export const STATES: Record<string, StateData> = {
  CA: {
    code: 'CA',
    name: 'California',
    maxAmount: '$12,500',
    filingFeeRange: '$30–$100',
    eFilingPortal: 'odysseyefileca.com',
    generalNotes: 'California has some of the most plaintiff-friendly small claims rules. Landlords must return deposits within 21 days. Employers face waiting time penalties for late final paychecks. Attorneys are not allowed to represent parties in small claims court.',
    counties: [
      { name: 'Los Angeles', slug: 'los-angeles', court: 'Los Angeles Superior Court', filingFee: '$30–$75', maxAmount: '$12,500', eFilingAvailable: true, address: '111 N. Hill Street, Los Angeles, CA 90012', phone: '(213) 830-0803', hours: 'Mon–Fri 8:30am–4:30pm', notes: 'LA County has 36 courthouse locations. File at the courthouse nearest to where the defendant lives or where the incident occurred. E-filing available through multiple approved providers.' },
      { name: 'San Diego', slug: 'san-diego', court: 'San Diego Superior Court', filingFee: '$30–$75', maxAmount: '$12,500', eFilingAvailable: true, address: '330 W Broadway, San Diego, CA 92101', phone: '(619) 450-7066', hours: 'Mon–Fri 8:30am–4:00pm', notes: 'Multiple locations throughout the county. Central Division handles most small claims. E-filing available.' },
      { name: 'Orange', slug: 'orange', court: 'Orange County Superior Court', filingFee: '$30–$75', maxAmount: '$12,500', eFilingAvailable: true, address: '700 Civic Center Dr W, Santa Ana, CA 92701', phone: '(657) 622-5200', hours: 'Mon–Fri 7:30am–4:00pm', notes: 'E-filing is mandatory for most filers. Self-represented litigants may still file in person. Harbor Justice Center and Lamoreaux Justice Center also handle small claims.' },
      { name: 'Riverside', slug: 'riverside', court: 'Riverside Superior Court', filingFee: '$30–$75', maxAmount: '$12,500', eFilingAvailable: true, address: '4050 Main Street, Riverside, CA 92501', phone: '(951) 777-3147', hours: 'Mon–Fri 8:00am–4:00pm', notes: 'Multiple courthouse locations. Indio courthouse serves the Coachella Valley. E-filing available.' },
      { name: 'San Bernardino', slug: 'san-bernardino', court: 'San Bernardino Superior Court', filingFee: '$30–$75', maxAmount: '$12,500', eFilingAvailable: true, address: '247 W 3rd Street, San Bernardino, CA 92415', phone: '(909) 708-8678', hours: 'Mon–Fri 8:00am–4:00pm', notes: 'Largest county in the contiguous US by area. Multiple courthouse locations including Victorville, Rancho Cucamonga, and Barstow.' },
      { name: 'Santa Clara', slug: 'santa-clara', court: 'Santa Clara Superior Court', filingFee: '$30–$75', maxAmount: '$12,500', eFilingAvailable: true, address: '191 N. First Street, San Jose, CA 95113', phone: '(408) 882-2100', hours: 'Mon–Fri 8:00am–4:00pm', notes: 'E-filing is mandatory for attorney-represented parties. Self-represented filers may use e-filing voluntarily. Multiple courthouse locations in the county.' },
      { name: 'Alameda', slug: 'alameda', court: 'Alameda Superior Court', filingFee: '$30–$75', maxAmount: '$12,500', eFilingAvailable: true, address: '1225 Fallon Street, Oakland, CA 94612', phone: '(510) 891-6000', hours: 'Mon–Fri 8:30am–4:00pm', notes: 'Covers Oakland, Berkeley, Fremont and surrounding cities. René C. Davidson Courthouse is the main location.' },
      { name: 'Sacramento', slug: 'sacramento', court: 'Sacramento Superior Court', filingFee: '$30–$75', maxAmount: '$12,500', eFilingAvailable: true, address: '720 9th Street, Sacramento, CA 95814', phone: '(916) 875-3400', hours: 'Mon–Fri 8:00am–4:00pm', notes: 'Carol Miller Justice Center opened for e-filing in 2024. Gordon D. Schaber Courthouse is the main location.' },
      { name: 'Contra Costa', slug: 'contra-costa', court: 'Contra Costa Superior Court', filingFee: '$30–$75', maxAmount: '$12,500', eFilingAvailable: true, address: '725 Court Street, Martinez, CA 94553', phone: '(925) 608-1000', hours: 'Mon–Fri 8:00am–4:00pm', notes: 'Courthouses in Martinez, Richmond, Pittsburg, and Walnut Creek. Walnut Creek courthouse handles West County cases.' },
      { name: 'Fresno', slug: 'fresno', court: 'Fresno Superior Court', filingFee: '$30–$75', maxAmount: '$12,500', eFilingAvailable: true, address: '1130 O Street, Fresno, CA 93721', phone: '(559) 457-1900', hours: 'Mon–Fri 8:00am–4:00pm', notes: 'Main courthouse downtown Fresno. Satellite locations in Clovis and Selma.' },
    ],
  },
  TX: {
    code: 'TX',
    name: 'Texas',
    maxAmount: '$20,000',
    filingFeeRange: '$54–$100',
    eFilingPortal: 'efiletexas.gov',
    generalNotes: 'Texas has the highest small claims limit of the three states at $20,000. Cases are filed in Justice of the Peace (JP) courts. eFileTexas.gov is the statewide e-filing system used by all JP courts.',
    counties: [
      { name: 'Harris', slug: 'harris', court: 'Harris County Justice of the Peace Courts', filingFee: '$54', maxAmount: '$20,000', eFilingAvailable: true, address: '301 Fanin Street, Houston, TX 77002', phone: '(713) 755-6390', hours: 'Mon–Fri 8:00am–4:30pm', notes: 'Harris County (Houston) has 16 JP precincts. The appropriate precinct depends on where the defendant lives or where the incident occurred. All use eFileTexas.gov.' },
      { name: 'Dallas', slug: 'dallas', court: 'Dallas County Justice of the Peace Courts', filingFee: '$54', maxAmount: '$20,000', eFilingAvailable: true, address: '600 Commerce Street, Dallas, TX 75202', phone: '(214) 653-7340', hours: 'Mon–Fri 8:00am–4:30pm', notes: 'Dallas County has multiple JP precincts across the county. Downtown Dallas JP court is most accessible. E-filing through eFileTexas.gov.' },
      { name: 'Tarrant', slug: 'tarrant', court: 'Tarrant County Justice of the Peace Courts', filingFee: '$54', maxAmount: '$20,000', eFilingAvailable: true, address: '100 W Weatherford Street, Fort Worth, TX 76196', phone: '(817) 884-1240', hours: 'Mon–Fri 8:00am–4:30pm', notes: 'Covers Fort Worth and surrounding cities. Multiple JP precincts. E-filing available through eFileTexas.gov.' },
      { name: 'Bexar', slug: 'bexar', court: 'Bexar County Justice of the Peace Courts', filingFee: '$54', maxAmount: '$20,000', eFilingAvailable: true, address: '100 Dolorosa Street, San Antonio, TX 78205', phone: '(210) 335-2213', hours: 'Mon–Fri 8:00am–5:00pm', notes: 'Covers San Antonio metro area. Multiple JP precincts. The Cadena-Reeves Justice Center handles many small claims.' },
      { name: 'Travis', slug: 'travis', court: 'Travis County Justice of the Peace Courts', filingFee: '$54', maxAmount: '$20,000', eFilingAvailable: true, address: '5501 Airport Blvd, Austin, TX 78751', phone: '(512) 854-9457', hours: 'Mon–Fri 8:00am–5:00pm', notes: 'Covers Austin and surrounding areas. Travis County has 5 JP precincts. E-filing through eFileTexas.gov.' },
      { name: 'Collin', slug: 'collin', court: 'Collin County Justice of the Peace Courts', filingFee: '$54', maxAmount: '$20,000', eFilingAvailable: true, address: '2100 Bloomdale Road, McKinney, TX 75071', phone: '(972) 548-4140', hours: 'Mon–Fri 8:00am–5:00pm', notes: 'Covers Plano, McKinney, Frisco and surrounding areas. Fast-growing county in North Texas.' },
      { name: 'Denton', slug: 'denton', court: 'Denton County Justice of the Peace Courts', filingFee: '$54', maxAmount: '$20,000', eFilingAvailable: true, address: '1450 E McKinney Street, Denton, TX 76209', phone: '(940) 349-2200', hours: 'Mon–Fri 8:00am–5:00pm', notes: 'Covers Denton, Lewisville, Flower Mound areas. Multiple JP locations.' },
      { name: 'Fort Bend', slug: 'fort-bend', court: 'Fort Bend County Justice of the Peace Courts', filingFee: '$54', maxAmount: '$20,000', eFilingAvailable: true, address: '301 Jackson Street, Richmond, TX 77469', phone: '(281) 341-8609', hours: 'Mon–Fri 8:00am–5:00pm', notes: 'Covers Sugar Land, Missouri City, Katy areas. Multiple JP precincts.' },
      { name: 'Montgomery', slug: 'montgomery', court: 'Montgomery County Justice of the Peace Courts', filingFee: '$54', maxAmount: '$20,000', eFilingAvailable: true, address: '207 W Phillips Street, Conroe, TX 77301', phone: '(936) 539-7896', hours: 'Mon–Fri 8:00am–5:00pm', notes: 'Covers The Woodlands, Conroe, Spring areas. North Houston suburbs.' },
      { name: 'El Paso', slug: 'el-paso', court: 'El Paso County Justice of the Peace Courts', filingFee: '$54', maxAmount: '$20,000', eFilingAvailable: true, address: '500 E San Antonio Avenue, El Paso, TX 79901', phone: '(915) 546-2071', hours: 'Mon–Fri 8:00am–5:00pm', notes: 'Covers El Paso city and surrounding communities. Border region with unique legal considerations.' },
    ],
  },
  FL: {
    code: 'FL',
    name: 'Florida',
    maxAmount: '$8,000',
    filingFeeRange: '$55–$300',
    eFilingPortal: 'myflcourtaccess.com',
    generalNotes: 'Florida small claims cases are handled in County Courts. The statewide e-filing portal myflcourtaccess.com covers all 67 counties. Florida requires a pre-trial conference before the hearing date in most counties.',
    counties: [
      { name: 'Miami-Dade', slug: 'miami-dade', court: 'Miami-Dade County Court', filingFee: '$55–$300', maxAmount: '$8,000', eFilingAvailable: true, address: '73 W Flagler Street, Miami, FL 33130', phone: '(305) 275-1155', hours: 'Mon–Fri 8:00am–5:00pm', notes: 'Largest county in Florida. Multiple courthouse locations including downtown Miami, North Dade, South Dade, and West Dade. E-filing through Florida Courts e-Filing Portal.' },
      { name: 'Broward', slug: 'broward', court: 'Broward County Court', filingFee: '$55–$300', maxAmount: '$8,000', eFilingAvailable: true, address: '201 SE 6th Street, Fort Lauderdale, FL 33301', phone: '(954) 831-6565', hours: 'Mon–Fri 8:00am–5:00pm', notes: 'Covers Fort Lauderdale, Hollywood, Pompano Beach area. Central courthouse in downtown Fort Lauderdale.' },
      { name: 'Palm Beach', slug: 'palm-beach', court: 'Palm Beach County Court', filingFee: '$55–$300', maxAmount: '$8,000', eFilingAvailable: true, address: '205 N Dixie Highway, West Palm Beach, FL 33401', phone: '(561) 355-2996', hours: 'Mon–Fri 8:00am–5:00pm', notes: 'Covers West Palm Beach, Boca Raton, Delray Beach. Main courthouse in downtown West Palm Beach.' },
      { name: 'Hillsborough', slug: 'hillsborough', court: 'Hillsborough County Court', filingFee: '$55–$300', maxAmount: '$8,000', eFilingAvailable: true, address: '800 E Twiggs Street, Tampa, FL 33602', phone: '(813) 276-8100', hours: 'Mon–Fri 8:00am–5:00pm', notes: 'Covers Tampa, Temple Terrace, Plant City. George E. Edgecomb Courthouse is the main location.' },
      { name: 'Orange', slug: 'orange', court: 'Orange County Court', filingFee: '$55–$300', maxAmount: '$8,000', eFilingAvailable: true, address: '425 N Orange Avenue, Orlando, FL 32801', phone: '(407) 836-2044', hours: 'Mon–Fri 8:00am–5:00pm', notes: 'Covers Orlando, Winter Park, Apopka. Orange County Courthouse is the main location. Tourist-heavy jurisdiction.' },
      { name: 'Pinellas', slug: 'pinellas', court: 'Pinellas County Court', filingFee: '$55–$300', maxAmount: '$8,000', eFilingAvailable: true, address: '315 Court Street, Clearwater, FL 33756', phone: '(727) 464-7000', hours: 'Mon–Fri 8:00am–5:00pm', notes: 'Covers St. Petersburg, Clearwater, Largo. Main courthouse in Clearwater, branch in St. Petersburg.' },
      { name: 'Duval', slug: 'duval', court: 'Duval County Court', filingFee: '$55–$300', maxAmount: '$8,000', eFilingAvailable: true, address: '330 E Bay Street, Jacksonville, FL 32202', phone: '(904) 255-2000', hours: 'Mon–Fri 8:00am–5:00pm', notes: 'Covers Jacksonville and beaches communities. Jacksonville is the largest city by area in the contiguous US.' },
      { name: 'Lee', slug: 'lee', court: 'Lee County Court', filingFee: '$55–$300', maxAmount: '$8,000', eFilingAvailable: true, address: '2120 Main Street, Fort Myers, FL 33901', phone: '(239) 533-5000', hours: 'Mon–Fri 8:00am–5:00pm', notes: 'Covers Fort Myers, Cape Coral, Bonita Springs. Southwest Florida gulf coast.' },
      { name: 'Polk', slug: 'polk', court: 'Polk County Court', filingFee: '$55–$300', maxAmount: '$8,000', eFilingAvailable: true, address: '255 N Broadway Avenue, Bartow, FL 33830', phone: '(863) 534-4000', hours: 'Mon–Fri 8:00am–5:00pm', notes: 'Covers Lakeland, Winter Haven, Bartow. Central Florida between Tampa and Orlando.' },
      { name: 'Brevard', slug: 'brevard', court: 'Brevard County Court', filingFee: '$55–$300', maxAmount: '$8,000', eFilingAvailable: true, address: '400 South Street, Titusville, FL 32780', phone: '(321) 637-5413', hours: 'Mon–Fri 8:00am–5:00pm', notes: 'Covers Melbourne, Cocoa Beach, Titusville. Space Coast region near Kennedy Space Center.' },
    ],
  },
}

export function getState(code: string): StateData | undefined {
  return STATES[code.toUpperCase()]
}

export function getCounty(stateCode: string, countySlug: string): County | undefined {
  const state = getState(stateCode)
  return state?.counties.find(c => c.slug === countySlug)
}
