import { DOMAINS } from "./domains"
import { IMAGES } from "./images"

// Nhóm 1: Có tracking page CÓ upsell (product recommend, quiz, bundle, content, social proof...)
export const BRANDS = [
    {
        name: 'GNC',
        domain: DOMAINS.gnc,
        images: [IMAGES.GNC_1, IMAGES.GNC_2]
    },
    {
        name: 'Happy Mammoth',
        domain: DOMAINS.happymammoth,
        images: [IMAGES.HAPPYMAMMOTH_1, IMAGES.HAPPYMAMMOTH_2]
    },
    {
        name: 'Froya Organics',
        domain: DOMAINS.froyaorganics,
        images: [IMAGES.FROYAORGANICS_1, IMAGES.FROYAORGANICS_2, IMAGES.FROYAORGANICS_3, IMAGES.FROYAORGANICS_4]
    },
    {
        name: 'Inno Supps',
        domain: DOMAINS.innosupps,
        images: [IMAGES.INNOSUPPS]
    },
    {
        name: 'Equip Foods',
        domain: DOMAINS.equipfoods,
        images: [IMAGES.EQUIPFOODS]
    },
    {
        name: 'The BB Co',
        domain: DOMAINS.thebbco,
        images: [IMAGES.THEBBCO]
    },
    {
        name: 'Rejuveen',
        domain: DOMAINS.rejuveen,
        images: [IMAGES.REJUVEEN]
    },
    {
        name: 'Soovera',
        domain: DOMAINS.soovera,
        images: [IMAGES.SOOVERA]
    }
]

// Nhóm 2: Có tracking page nhưng KHÔNG upsell (chỉ form / text status)
export const NOT_UPSELL_TRACKING_PAGE_BRANDS = [
    {
        name: 'mengotomars',
        domain: DOMAINS.mengotomars,
        images: [IMAGES.MENGOTOMARS_1, IMAGES.MENGOTOMARS_2]
    },
    {
        name: 'honehealth',
        domain: DOMAINS.honehealth,
        images: [IMAGES.HONEHEALTH]
    },
    {
        name: 'Rejuvacare',
        domain: DOMAINS.rejuvacare,
        images: [IMAGES.REJUVACARE]
    },
    {
        name: 'luxeresearchlab',
        domain: DOMAINS.luxeresearchlab,
        images: [IMAGES.LUXERESEARCHLAB]
    },
    {
        name: 'buckedup',
        domain: DOMAINS.buckedup,
        images: [IMAGES.BUCKEDUP]
    },
    {
        name: 'olavita',
        domain: DOMAINS.olavita,
        images: [IMAGES.OLAVITA]
    },
    {
        name: 'alphalion',
        domain: DOMAINS.alphalion,
        images: [IMAGES.ALPHALION]
    },
    {
        name: 'Ploise',
        domain: DOMAINS.ploise,
        images: [IMAGES.PLOISE]
    },
    {
        name: 'Myoro',
        domain: DOMAINS.myoro,
        images: [IMAGES.MYORO]
    },
    {
        name: 'Fiera Cosmetic',
        domain: DOMAINS.fieracosmetic,
        images: [IMAGES.FIERACOSMETIC]
    },
    {
        name: 'Balmbare',
        domain: DOMAINS.balmbare,
        images: [IMAGES.BALMBARE]
    },
    {
        name: 'True Protein',
        domain: DOMAINS.trueprotein,
        images: [IMAGES.TRUEPROTEIN]
    },
    {
        name: 'Trynomend',
        domain: DOMAINS.trynomend,
        images: [IMAGES.TRYNOMEND]
    },
    {
        name: 'Trysaphire',
        domain: DOMAINS.trysaphire,
        images: [IMAGES.TRYSAPHIRE]
    },
    {
        name: 'Mivourr',
        domain: DOMAINS.mivourr,
        images: [IMAGES.MIVOURR]
    },
    {
        name: 'Blymeskinsystems',
        domain: DOMAINS.blymeskinsystems,
        images: [IMAGES.BLYMESKINSYSTEMS]
    }
]

// Nhóm 3: KHÔNG có tracking page public (login-gated, email-only, brand mismatch, parked domain...)
export const NOT_HAVE_TRACKING_PAGE_BRANDS = [
    {
        name: 'tryrosabella',
        domain: 'https://tryrosabella.com',
        images: []
    },
    {
        name: 'ellaola',
        domain: 'https://ellaola.com',
        images: []
    },
    {
        name: 'MuscleFood',
        domain: DOMAINS.musclefood,
        images: [IMAGES.MUSCLEFOOD]
    },
    {
        name: 'Primal King / Primal Viking',
        domain: DOMAINS.primalking,
        images: [IMAGES.PRIMALKING]
    },
    {
        name: 'Ancestral Supplements',
        domain: DOMAINS.ancestralsupplements,
        images: [IMAGES.ANCESTRALSUPPLEMENTS]
    },
    {
        name: 'Pendulum',
        domain: DOMAINS.pendulum,
        images: [IMAGES.PENDULUM]
    },
    {
        name: 'Norse Organics',
        domain: DOMAINS.norseorganics,
        images: [IMAGES.NORSEORGANICS]
    },
    {
        name: 'Truvani',
        domain: DOMAINS.truvani,
        images: [IMAGES.TRUVANI]
    },
    {
        name: 'Lonvera',
        domain: DOMAINS.lonvera,
        images: [IMAGES.LONVERA]
    },
    {
        name: 'Rejuvia',
        domain: DOMAINS.rejuvia,
        images: [IMAGES.REJUVIA]
    },
    {
        name: 'Zenith Labs',
        domain: DOMAINS.zenith,
        images: [IMAGES.ZENITH]
    },
    {
        name: 'WelleCo',
        domain: DOMAINS.welleco,
        images: [IMAGES.WELLECO]
    },
    {
        name: 'OMNI Creatine',
        domain: DOMAINS.omnicreatine,
        images: [IMAGES.OMNICREATINE]
    },
    {
        name: 'SP Nutrition',
        domain: DOMAINS.spnutrition,
        images: [IMAGES.SPNUTRITION]
    },
    {
        name: 'Zenther (brand mismatch)',
        domain: DOMAINS.zenther,
        images: [IMAGES.ZENTHER]
    },
    {
        name: 'Martin Clinic',
        domain: DOMAINS.martinclinic,
        images: [IMAGES.MARTINCLINIC]
    }
]
