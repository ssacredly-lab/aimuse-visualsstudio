

// --- Utility ---
const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];


// --- Style outfit pools (luxury, on-trend) ---
const OUTFITS_BY_STYLE: Record<string, string[]> = {
    "Cinematic": [
        "silk slip dress under cropped boxy blazer, pointed slingbacks, micro top-handle bag, delicate layered gold chains",
        "tailored wide-leg trousers, fitted knit tank, structured blazer on shoulders, strappy heels, sculptural earrings",
        "satin midi skirt, ribbed long-sleeve, patent mules, mini baguette bag, slim metal hoops"
    ],
    "Editorial": [
        "sculptural blazer with cinched waist, pleated mini, sheer tights, stiletto pumps, statement cuffs",
        "asymmetric satin dress, metallic sandals, micro clutch, bold earrings",
        "structured co-ord set with sharp shoulders, pointed heels, finger-ring stack"
    ],
    "Lifestyle": [
        "linen trousers, ribbed knit top, lightweight trench, ballet flats, woven leather bag",
        "cropped cardigan, high-waist jeans, kitten heels, mini shoulder bag, pearl studs",
        "pleated tennis-inspired skirt, cashmere polo, low profile sneakers, sunglasses chain"
    ],
    "Old Money": [
        "cashmere crewneck, pleated high-waist trousers, slingback heels, structured mini bag, pearl necklace",
        "tweed jacket, silk blouse, tailored skirt, block-heel pumps, discreet gold bracelet",
        "double-breasted blazer, flared trousers, leather loafers, top-handle bag"
    ],
    "Clean Girl Aesthetic": [
        "monochrome column dress, square-toe sandals, slim cuff, architect tote",
        "clean wide-leg set with tank, minimalist belt, leather mules, micro-strap bag",
        "crisp white shirt, black cigarette pants, flat slingbacks, tiny hoops"
    ],
    "Hyper-Real Beauty": [
        "sleek satin cami, tailored trousers, strappy heels, crystal studs (kept subtle)",
        "off-shoulder knit, silk midi, ankle-strap heels, fine chain choker",
        "clean bandeau top, high-waist skirt, barely-there sandals, micro clutch"
    ],
    "Pinterest Lifestyle": [
        "flowy midi dress, raffia slides, woven basket bag, cat-eye sunnies",
        "ribbed set (crop + skirt), sandals, mini crescent bag, stackable rings",
        "oversized linen shirt, tailored shorts, thong sandals, soft pouch bag"
    ],
    "Surreal Luxury": [
        "pearlescent co-ord with reflective accents, sculptural heels, chrome mini bag",
        "bias-cut satin gown, mirrored sandals, geometric jewelry",
        "tailored suit in pastel sheen, metallic heels, architectural earrings"
    ],
    "Fashion Runway": [
        "statement padded-shoulder blazer, micro skirt, thigh-high boots, micro clutch",
        "sheer paneled dress, crystal strap sandals, sculptural ear cuff",
        "power co-ord with exaggerated silhouette, patent pumps, logo mini bag"
    ],
    "Street Style": [
        "oversized bomber, ribbed tank, parachute cargos, Adidas Samba / New Balance, mini shoulder bag, layered chains",
        "trench coat, baby tee, puddle jeans, pointed kitten boots, slim sunglasses",
        "leather biker, pleated mini, knee boots, crescent bag, chunky hoops"
    ],
    "General": [
        "cropped boxy blazer, ribbed knit top, pleated high-waist trousers, pointed kitten heels, micro designer bag, statement hoops",
        "slip dress with blazer on shoulders, strappy heels, mini top-handle, fine layered gold",
        "tailored shorts suit, slingbacks, baguette bag, slim metal earrings"
    ]
};

// --- Contextual outfits (sports/seasons/locales) ---
const CONTEXT_OUTFITS: Record<string, string[]> = {
    // --- Runway ---
    "runway": OUTFITS_BY_STYLE["Fashion Runway"],
    
    // --- Sports ---
    "tennis": [
        "performance tennis dress in luxury white with pleated skirt, pastel logo visor, court sneakers, micro tennis bag",
        "white ribbed crop polo with pleated skort, clean sneakers, gold stud earrings, slim sweatband, luxury racket as prop"
    ],
    "basketball": [
        "baby pink fitted crop and high-waist shorts, luxury pastel sneakers, subtle gold hoops, glossy ponytail, branded basketball",
        "street-luxury co-ord in soft neutral tones, high-top sneakers, layered chains, sleek court duffel"
    ],
    "horse_riding": [
        "tailored equestrian jacket, ivory riding breeches, glossy knee-high riding boots, slim leather gloves, sleek helmet",
        "cream ribbed knit top tucked into beige breeches, brown leather boots, quilted gilet, chic riding cap"
    ],
    "pilates": [
        "baby pink ribbed gym set (crop + leggings), delicate gold studs, sleek ponytail, luxury pilates reformer",
        "neutral-tone sports bra and flared leggings, minimalist jewelry, soft scrunchie, elegant grip socks"
    ],
    "boxing": [
        "designer sports bra and satin boxing shorts, Louis Vuitton wrist wraps, sleek sneakers, subtle gold studs",
        "Prada co-ord tank + leggings, glossy gloves, ponytail, luxury branded water bottle"
    ],
    "skiing": [
        "cream padded ski suit with luxury belt, fur-lined hood, reflective goggles, slim ski gloves",
        "ivory turtleneck base layer under pastel ski jacket, fitted ski pants, quilted mittens, sleek helmet"
    ],
    "swimwear": [
        "white bandeau bikini with gold hardware, sheer sarong, oversized sunglasses, raffia tote",
        "baby pink one-piece with cutouts, silk cover-up, luxury slides, micro hoop earrings"
    ],
    "cycling": [
        "sleek pastel cycling set (aero jersey + shorts), wraparound sunglasses, designer helmet, minimal sneakers",
        "neutral luxury cycling kit with logo stripe, white sneakers, slim layered gold chains under collar"
    ],
    "running": [
        "luxury performance set (ribbed sports bra + biker shorts), pastel sneakers, micro logo cap, sleek ponytail",
        "neutral tone long-sleeve running top with high-waist shorts, minimal jewelry, running armband"
    ],
    "yoga": [
        "buttery-soft ribbed yoga set in muted pastel, barefoot, dainty layered chains, hair in bun",
        "luxury neutral-tone sports bra and flared yoga pants, silk headband, rolled mat as prop"
    ],
    "golf": [
        "pleated ivory golf skirt, ribbed knit polo, pastel visor, clean sneakers, leather golf glove",
        "fitted neutral-tone golf dress, logo cap, chic golf bag, dainty hoops"
    ],
    "hiking": [
        "neutral-tone performance leggings, lightweight pastel windbreaker, designer trail boots, sleek backpack",
        "ivory cropped sports top with beige cargo joggers, technical sneakers, bucket hat"
    ],
    "dance": [
        "sleek ballet-core wrap top, silk warm-up shorts, leg warmers, pointe shoes as prop",
        "minimalist black leotard, sheer ballet skirt, hair in a tight bun, delicate pearl earrings"
    ],
    "skating": [
        "oversized graphic hoodie, pleated mini skirt, high socks, retro roller skates, crossbody bag",
        "fitted pastel crop top, high-waist denim shorts, designer sneakers, statement sunglasses"
    ],
    "gym": [
        "luxury-brand sports bra and matching high-waist leggings, sleek ponytail, designer water bottle, minimalist sneakers",
        "ribbed seamless gym set in a neutral tone, baseball cap, white socks, chunky sneakers"
    ],

    // --- Lifestyle / Travel ---
    "airport": [
        "oversized blazer layered over ribbed crop and wide-leg trousers, designer sneakers, micro crossbody, silk scarf on handle, luxury carry-on",
        "matching knit co-ord set, trench coat draped, baseball cap, glossy tote, logo suitcase"
    ],
    "cafe": [
        "trench coat over puddle jeans and ribbed tank, ballet flats, micro bag, latte in hand",
        "pleated mini skirt, cashmere polo, kitten heels, structured tote, cappuccino prop"
    ],
    "brunch": [
        "silk slip midi dress, strappy sandals, baguette bag, slim gold chains, iced latte",
        "linen blazer dress, kitten mules, woven clutch, dainty pearl earrings"
    ],
    "redcarpet": [
        "floor-length couture gown with satin drape, crystal heels, statement earrings, glossy clutch",
        "bias-cut metallic gown, rhinestone sandals, sculptural cuff bracelet, micro minaudière"
    ],
    "festival": [
        "crochet bralette, high-waist denim shorts, fringe bag, cowboy boots, slim sunglasses",
        "lace-up corset top, parachute pants, statement belt, platform boots, layered chains"
    ],
    "yacht": [
        "linen matching set, bikini under open shirt, raffia tote, oversized sunglasses, sandals",
        "white silk wrap dress, woven slides, straw visor, pearl studs"
    ],
    "vineyard": [
        "flowy floral midi dress, raffia bag, sun hat, strappy sandals, wine glass prop",
        "linen jumpsuit, block-heel sandals, woven clutch, dainty gold jewelry"
    ],
    "spa": [
        "silk robe, fluffy slides, gold studs, rolled towel, glass of cucumber water",
        "cream cashmere lounge set, spa headband, minimal jewelry, herbal tea prop"
    ],

    // --- Seasonal / Location ---
    "christmas": [
        "cashmere coat over turtleneck, tailored trousers, leather gloves, hot chocolate cup",
        "wool wrap coat, knit scarf, knee boots, structured mini bag, mulled wine prop"
    ],
    "picnic": [
        "floral midi dress, raffia basket, strappy sandals, sun hat, pastel blanket",
        "linen jumpsuit, leather slides, woven tote, oversized sunnies, fruit basket"
    ],
    "rainy": [
        "pastel trench coat, glossy rain boots, umbrella, silk scarf, leather satchel",
        "oversized neutral coat, wide-leg trousers tucked into boots, structured bag, umbrella"
    ],

    // --- Professional / Everyday ---
    "office": [
        "tailored blazer dress, pointed heels, structured tote, subtle pearl studs",
        "ivory silk blouse tucked into pleated skirt, slingbacks, mini top-handle bag"
    ],
    "gallery": [
        "oversized blazer, wide-leg trousers, slim turtleneck, crescent bag, square-toe boots",
        "sculptural midi dress, block heels, leather clutch, minimalist jewelry"
    ],
    "shopping": [
        "tweed jacket, mini skirt, logo bag, slingbacks, Dior shopping bag",
        "tailored blazer over silk tank, wide-leg pants, glossy loafers, multiple boutique bags"
    ],
    "jet": [
        "sleek co-ord set in pastel neutral, Birkin bag, glossy heels, silk scarf",
        "monochrome knit dress, slingbacks, quilted carry-on, oversized sunglasses"
    ]
};

// --- New Cinematic & Editorial Specifics ---

const CINEMATIC_SCENARIOS = [
    "in a glass-walled penthouse living room with panoramic skyline views",
    "walking through a moody luxury hotel corridor with shafts of golden light",
    "on a rooftop at golden hour with long city shadows across polished concrete",
    "inside a minimalist art gallery with towering white walls and dramatic spotlights",
    "lounging on a modern yacht deck against an ocean backdrop",
    "at a candlelit rooftop bar with glowing city lights in the distance",
    "inside a heritage mansion with marble floors and tall arched windows",
    "beside a rain-kissed street with neon reflections bouncing off puddles",
    "in a cinematic café scene with steam rising from porcelain cups",
    "walking across a luxury airport terminal with glossy marble floors"
];

const CINEMATIC_WARDROBE = [
    "silk slip midi with delicate lace trim, paired with strappy heels and a micro Lady Dior",
    "tailored high-waist trousers and ribbed knit tank topped with an oversized blazer and slingbacks",
    "satin maxi skirt with a sculpted corset top and strappy Bottega heels",
    "structured monochrome pantsuit layered with a bralette, styled with a Chanel top-handle bag",
    "asymmetric satin gown with metallic belt and sculptural jewelry",
    "sheer blouse tucked into leather pencil skirt, styled with crystal earrings and pointed pumps",
    "backless silk dress with dramatic low drape, accessorized with layered Cartier bracelets",
    "wide-leg palazzo trousers and a cropped knit, paired with a Hermes Kelly bag",
    "satin jumpsuit with plunging neckline, cinched with a statement belt",
    "pleated midi skirt with fitted knit and Dior slingbacks"
];

const CINEMATIC_ACCESSORIES = [
    "Cartier Love bracelet stack",
    "Chanel pearl drop earrings",
    "Hermès Birkin 25",
    "Bottega cassette bag",
    "Versace statement belt",
    "Balenciaga cat-eye sunglasses",
    "gold layered chains with micro pendant",
    "Van Cleef Alhambra necklace",
    "Prada mini crystal bag",
    "Gucci sculptural heels"
];

const EDITORIAL_WARDROBE_CLEAN = [
    "double-breasted tailored blazer with matching straight-leg trousers and pointed pumps",
    "silk bow-tie blouse tucked into a high-waist pencil skirt with slingback heels",
    "sculpted peplum jacket with cigarette pants and patent stilettos",
    "cap-sleeve column dress with structured shoulders and metal-tip belt",
    "tweed co-ord (jacket + mini) with Mary-Jane heels",
    "wrap midi dress in satin crepe with ankle-strap heels",
    "cape blazer over tailored ankle trousers with sleek pumps",
    "pleated midi skirt with fine-gauge knit and kitten heels",
    "boat-neck midi sheath with sculptural earrings and pointed heels",
    "single-breasted suit in monochrome with silk shell and stilettos",
    "A-line midi dress with architectural seams and slingbacks",
    "high-neck satin blouse with wide-leg trousers and waist belt",
    "longline trench layered over knit midi dress with heeled boots",
    "structured blazer over silk camisole (fully lined) and pencil skirt",
    "belted shirt-dress in crisp poplin with heeled mules",
    "cropped blazer with high-rise pleated trousers and pointed pumps",
    "sculptural midi dress with asymmetric hem and minimal straps (lined)",
    "accordion-pleat skirt with tailored waistcoat and slingbacks",
    "double-pleat wool trousers with fine merino turtleneck and pumps",
    "shift dress with contrast piping and sleek court heels"
];

const EDITORIAL_ACCESSORIES_CLEAN = [
    "sculptural gold earrings",
    "Van Cleef pendant necklace",
    "Cartier Love bracelet stack",
    "mini Lady Dior bag",
    "Saint Laurent envelope clutch",
    "Bottega cassette bag",
    "sleek leather waist belt",
    "Chanel pearl studs",
    "Prada pointed pumps",
    "Gucci slingbacks"
];


// --- New Old Money Specifics ---

const OLDMONEY_SCENARIOS = [
    "walking through a manicured estate garden with marble fountains",
    "posed on the steps of a neoclassical mansion with grand columns",
    "seated in a mahogany library with floor-to-ceiling bookshelves",
    "on a private yacht deck with polished wood and brass detailing",
    "standing in a country club terrace overlooking tennis courts",
    "walking along cobblestone streets in Paris with heritage storefronts",
    "lounging in a cream-upholstered salon with gilded mirrors",
    "standing in a vineyard at golden hour with rolling hills behind",
    "at a polo match sideline in a wide-brim hat and chic tailoring",
    "inside a grand dining hall with crystal chandeliers and marble flooring",
    "leaning on the balustrade of a terrace overlooking Lake Como",
    "in a stone courtyard with climbing ivy and wrought-iron details"
];

const OLDMONEY_WARDROBE = [
    "cream wide-leg trousers with a silk blouse and Hermès belt",
    "pleated midi skirt with cashmere knit and pearl necklace",
    "structured tweed blazer over white trousers with Chanel slingbacks",
    "linen shirt-dress cinched with a tan leather belt and Hermès sandals",
    "double-breasted navy blazer with gold buttons, tailored pants, and loafers",
    "silk scarf-tied around the neck with a belted trench coat and Dior pumps",
    "equestrian-inspired blazer with jodhpur trousers and riding boots",
    "A-line midi dress with cropped cardigan and pearl drop earrings",
    "monochrome cream co-ord with wide belt and Gucci horsebit loafers",
    "tailored ivory suit with silk camisole and Cartier bangles",
    "boat-neck shift dress with statement brooch and pointed pumps",
    "wool cape over high-rise trousers with silk blouse and Tod’s loafers"
];

const OLDMONEY_ACCESSORIES = [
    "Hermès Kelly bag",
    "Chanel quilted top-handle",
    "Cartier Tank watch",
    "pearl drop earrings",
    "Hermès silk scarf",
    "Bulgari Serpenti sunglasses",
    "Celine box bag",
    "Van Cleef Alhambra necklace",
    "Dior slingback heels",
    "Ralph Lauren leather belt"
];


// --- New Clean Girl Aesthetic Specifics ---

const CLEAN_GIRL_SCENARIOS = [
    // Indoors minimalist luxe
    "inside a sunlit minimalist apartment with white oak floors and sheer linen curtains",
    "in a marble bathroom with freestanding tub, white orchids, and gold fixtures",
    "lounging on a boucle sofa with coffee table books, candles, and fresh peonies",
    "standing in a white kitchen with marble counters and a designer espresso machine",
    "posed by a floor-length mirror in a bright walk-in wardrobe with white cabinetry",
    "inside a boutique studio with airy neutral tones and linen drapes",
    "in a luxury hotel suite with crisp white bedding and minimal art pieces",
    "relaxing in a spa-like lounge with soft ivory textiles and ambient lighting",

    // Outdoor dreamy escapes
    "walking barefoot on a whitewashed terrace in Santorini with cobalt-blue domes behind",
    "seated at a café in Amalfi with white linen parasols and lemon trees",
    "standing on a minimalist rooftop in Ibiza with white stucco walls and glowing sunlight",
    "posed on a balcony overlooking the Aegean Sea with white railings and stone steps",
    "lounging on a coastal villa terrace with infinity pool and ivory daybeds",
    "walking through a pastel bougainvillea-lined courtyard with whitewashed walls",
    "on a yacht deck with crisp white seating and soft ocean light",
    "exploring cobblestone streets in Mykonos with white walls and pastel shutters",
    "at a cliffside restaurant in Positano with white umbrellas and sea views",
    "standing under a stone archway in a luxury Greek villa courtyard"
];

const CLEAN_GIRL_WARDROBE = [
    "white linen co-ord set with oversized shirt and tailored shorts",
    "cream ribbed knit midi dress styled with delicate gold chains",
    "silk slip dress in ivory with strappy nude sandals",
    "wide-leg white trousers with fitted beige crop top and Bottega heels",
    "white cropped blazer over matching mini skirt with Dior slingbacks",
    "pastel blue satin blouse tucked into ivory pleated trousers",
    "buttery cashmere set in off-white with Cartier bangles",
    "ivory satin maxi skirt with fitted tank and Hermès sandals",
    "neutral co-ord with cropped cardigan and straight-leg trousers",
    "flowy pastel-pink blouse paired with cream culottes and strappy sandals",
    "lightweight white sundress with raffia bag and nude sandals",
    "ivory high-rise shorts with cropped linen vest and tan leather belt",
    "white halter jumpsuit with sculptural earrings and strappy heels",
    "cream wrap dress in satin crepe with pointed sandals",
    "pastel yellow cropped knit paired with white tailored trousers"
];

const CLEAN_GIRL_ACCESSORIES = [
    "gold huggie hoops",
    "Hermès Oran sandals",
    "Chanel quilted mini bag",
    "Cartier Love bracelet stack",
    "Bottega Veneta padded cassette bag",
    "Van Cleef Alhambra necklace",
    "Dior slingback pumps",
    "Chanel pearl studs",
    "minimalist beige leather tote",
    "raffia bucket bag with leather trim",
    "oversized Celine sunglasses",
    "delicate anklet chain",
    "Hermès silk scarf tied to handbag",
    "strappy nude sandals with gold hardware",
    "Miu Miu ballet flats in ivory"
];


// --- New Hyper-Real Beauty Specifics ---

const HYPERREAL_BEAUTY_SCENARIOS = [
    // Studio beauty campaigns
    "studio close-up with seamless pastel gradient backdrop",
    "against a minimalist white cyc wall with perfect even light",
    "editorial beauty studio with bold shadow split-lighting",
    "against a muted beige backdrop with soft vignetting",
    "glossy campaign setup with mirrored acrylic floor reflections",
    "cinematic beauty shoot with soft haze and glowing rim lights",
    // Luxury lifestyle beauty
    "in a marble bathroom vanity scene with golden sconces and reflections",
    "morning light streaming through sheer curtains onto fresh skin",
    "sunlit terrace beauty shot with Mediterranean tiles in the background",
    "golden hour rooftop with lens flare highlighting skin glow",
    "beside a crystal-clear infinity pool with shimmering light on the face",
    // High-fashion editorial beauty
    "surrounded by oversized beauty props like perfume bottles or silk fabric",
    "with subtle white rose petals scattered across shoulders",
    "against a sculptural floral installation in ivory tones",
    "in a high-fashion editorial studio with blown silk fans",
    "candid vanity moment with makeup scattered on marble counter",
];

const HYPERREAL_BEAUTY_WARDROBE = [
    // Clean luxe tops
    "silk camisole in ivory with ultra-thin straps",
    "strapless satin bustier in cream with tailored seams",
    "minimalist bandeau in matte white cotton",
    "halter-neck silk slip top in champagne",
    "draped blush satin blouse off one shoulder",
    "structured corset-inspired knit top in ivory",
    "sleek ribbed tank in soft beige with sculptural neckline",
    "satin asymmetric crop top with delicate straps",
    "soft cashmere wrap in cream draped elegantly",
    "long-sleeve fitted bodysuit in off-white",
    // Beauty campaign add-ons
    "sculptural collar necklace framing a simple white dress",
    "low back satin slip with delicate chain details",
    "pearl-strap camisole paired with minimalist satin skirt"
];

const HYPERREAL_BEAUTY_ACCESSORIES = [
    "Cartier Love necklace",
    "Van Cleef Alhambra studs",
    "tiny diamond solitaire earrings",
    "gold huggie hoops",
    "delicate tennis bracelet",
    "sleek Cartier bangle",
    "Chanel pearl studs",
    "fine layered gold chains",
    "Bulgari Serpenti ring",
    "Prada crystal hair clip",
    "thin anklet chain with micro diamond charm",
    "sculptural ear cuff in gold"
];


// --- New Pinterest Lifestyle Specifics ---

const PINTEREST_LIFESTYLE_SCENARIOS = [
    // Cozy indoor lifestyle
    "luxury coffee table moment with glossy magazines and latte art",
    "minimalist marble kitchen island with fresh croissants and cappuccino",
    "soft morning light pouring into a neutral-toned bedroom with linen sheets",
    "glossy bathroom counter with perfume bottles and glowing candles",
    "aesthetic bookshelf styling with pampas grass and designer coffee table books",
    // Travel & outdoor
    "sipping coffee at a whitewashed Santorini terrace overlooking the sea",
    "luxury picnic on a beige linen blanket with fresh fruit and sparkling water",
    "sunset rooftop terrace with wine glasses and golden rim lighting",
    "walking cobblestone streets with cream blazer over shoulders",
    "posing near vintage pastel car in a coastal European village",
    "holding flowers outside a Parisian café in springtime",
    "bicycle moment in Amsterdam with basket full of white tulips",
    // Seasonal Pinterest moods
    "autumn café scene with cashmere wrap and pumpkin latte",
    "Christmas market with mulled wine and twinkling lights",
    "springtime floral market with fresh bouquets and woven basket bag",
    "summer beach walk in linen dress with straw tote",
    "winter cozy luxury chalet scene with hot chocolate and faux fur throw",
];

const PINTEREST_LIFESTYLE_WARDROBE = [
    "linen slip dress in ivory with woven straw tote",
    "cream oversized blazer with straight-leg trousers and loafers",
    "silk blouse tucked into tailored shorts with espadrilles",
    "fitted ribbed midi dress in beige with gold hoops",
    "long trench coat over cropped denim and ballet flats",
    "cashmere sweater in off-white with pleated midi skirt",
    "linen wrap dress with lace-up sandals",
    "neutral co-ord set in cream with designer slides",
    "satin camisole with tailored wide-leg trousers",
    "soft knit cardigan with high-rise jeans and minimal sneakers",
    "sundress in pastel tones with straw hat",
    "white cotton shirt dress with cinched waist and leather belt",
    "neutral athleisure set with tonal trainers",
    "ivory button-down tucked into linen shorts",
];

const PINTEREST_LIFESTYLE_ACCESSORIES = [
    "woven straw tote",
    "delicate layered gold chains",
    "oversized sunglasses",
    "Chanel mini flap bag",
    "Cartier Love bracelet",
    "silk headscarf tied elegantly",
    "classic Hermès Birkin",
    "fine pearl studs",
    "Saint Laurent clutch",
    "vintage woven basket bag",
];


// --- New Surreal Luxury Specifics ---

const SURREAL_LUXURY_SCENARIOS = [
    // Cloud & celestial
    "floating on soft clouds with golden light breaking through",
    "walking across a mirrored runway suspended in the sky",
    "surrounded by giant pearl orbs glowing softly in mist",
    "resting in a marble swing chair among drifting clouds",
    "celestial rooftop with glowing crescent moon in background",
    // Water & reflection
    "standing in ankle-deep mirrored water reflecting pastel skies",
    "floating in a luxury pool where the water melts into the horizon",
    "surrounded by glass prisms casting rainbow light across skin",
    "walking through a reflective hall of mirrors with infinite depth",
    "submerged underwater moment in couture gown with flowing silk",
    // Futuristic surreal
    "posed on floating marble stairs disappearing into the sky",
    "inside a crystalline glass dome with glowing geometric light",
    "walking across infinity glass bridge with no visible support",
    "seated on a levitating marble block above a surreal landscape",
    "holding luminous orb in a room of suspended crystal chandeliers",
    // Dreamlike interiors
    "inside an endless white marble hall with columns dissolving into mist",
    "candlelit palace hallway with glowing golden haze",
    "seated beneath an oversized chandelier in a mirrored ballroom",
    "luxury bedroom where sheer curtains float as if underwater",
];

const SURREAL_LUXURY_WARDROBE = [
    "flowing couture gown in metallic silver with sculptural pleats",
    "sheer layered chiffon dress with architectural embroidery",
    "floor-length satin gown with corset bodice and cascading train",
    "high-neck embellished dress with pearl and crystal detailing",
    "draped silk gown in celestial blue with golden chain accents",
    "structured sculptural blazer-dress with exaggerated shoulders",
    "liquid gold slip dress with bias cut and glowing sheen",
    "asymmetric gown in iridescent organza with long train",
    "corset top with billowing layered tulle skirt in soft blush",
    "floor-length sequin dress in champagne tones",
];

const SURREAL_LUXURY_ACCESSORIES = [
    "Cartier diamond choker",
    "Chanel pearl tiara",
    "Van Cleef celestial earrings",
    "sleek metallic cuffs",
    "Gucci crystal-studded heels",
    "Bulgari Serpenti necklace",
    "oversized sculptural gold earrings",
    "Prada crystal clutch",
    "Chanel couture gloves",
    "crystal-studded hair comb",
];


// --- New Street Style Specifics (On-Trend 2025) ---
const STREET_STYLE_SCENARIOS = [
    // Daytime — modern street snaps
    "walking across a crosswalk in SoHo at golden hour with taxis blurred behind",
    "posed mid-stride outside Louis Vuitton store with bold sunlight and sharp shadows",
    "leaning on concrete steps of a modern building with crisp morning light",
    "seated on marble ledge with iced coffee in hand and shopping bags at her feet",
    "posing against graffiti wall with cinematic side-light hitting her profile",
    "street snap outside a Dior flagship with city reflections in the glass",
    "waiting on a curb with blurred cyclists rushing by in background",
    // Nighttime — neon/flash energy
    "posed under glowing neon storefront with direct flash aesthetic",
    "NYC crosswalk at night with paparazzi-style flash exposure",
    "leaning against matte black SUV lit by car headlights + flash",
    "posed mid-laugh outside rooftop bar with neon reflections in glass",
    "walking across zebra lines with blurred headlights behind, flash illuminating outfit",
    "leaning on brick alley wall with neon glow wrapping the silhouette",
    "sidewalk after rain with reflective puddles catching city lights",
];

const STREET_STYLE_WARDROBE = [
    // On-trend 2025 fits
    "oversized bomber jacket with white ribbed crop top and high-waist cargo trousers, styled with chunky Dior sneakers",
    "baggy pleated trousers with asymmetric cut-out crop top and Bottega woven heels",
    "cropped varsity jacket with ribbed tank and parachute pants tucked into Prada combat boots",
    "oversized leather blazer layered over micro bralette and wide-leg jeans with Chanel slingbacks",
    "cargo maxi skirt paired with strapless corset top and YSL statement belt",
    "denim co-ord (cropped jacket + baggy jeans) styled with Jacquemus micro bag and Gucci sneakers",
    "low-rise satin parachute pants with bandeau top and Hermès Kelly bag tucked under arm",
    "oversized hoodie layered under camel trench with Saint Laurent clutch and platform sneakers",
    "pleated tennis mini skirt with oversized knit jumper and Dior saddle bag",
    "baggy cream tailored trousers with halter-neck silk top and Cartier Love bracelet stack",
];

const STREET_STYLE_ACCESSORIES = [
    "Jacquemus Le Chiquito mini bag",
    "Bottega cassette shoulder bag",
    "oversized Prada sunglasses",
    "Chanel quilted belt bag",
    "Cartier Love bracelet stack",
    "Hermès Kelly bag",
    "Balenciaga chunky sneakers",
    "sleek Dior bucket hat",
    "gold Cuban chain necklace",
    "Saint Laurent platform boots",
];


// --- Runway Mode Specifics ---
export const _is_runway_mode = (style_key: string = "", video_vibe_key: string = "", vibe_text: string = ""): boolean => {
    const s = (style_key || "").trim().toLowerCase();
    const v = (video_vibe_key || "").trim().toLowerCase();
    const t = (vibe_text || "").trim().toLowerCase();
    return s.includes("runway") || v.includes("runway") || ["runway", "catwalk", "fashion week", "pfw", "mfw"].some(k => t.includes(k));
};

export const _RUNWAY_SHOTS: string[] = [
    "full-body runway stride on center line; confident snap pose at end",
    "tele follow during stride; beauty close-up on pose",
    "symmetry-forward hero frame mid-catwalk with elongated perspective"
];

export const _runway_scene_phrase = (isOutdoor: boolean): string => {
    return isOutdoor 
        ? pick([
            "on an outdoor fashion runway with extended catwalk and open-air truss lighting",
            "on a rooftop runway with reflective platform and skyline backdrop",
            "on an open-air runway with audience risers and graphic sightlines"
        ])
        : pick([
            "on an indoor fashion runway with glossy catwalk and spotlight cones",
            "on a show runway with reflective floor, truss rigs, and light haze",
            "on a minimalist white runway with long center line and graphic lighting"
        ]);
};

export const _runway_scene_block = (isOutdoor: boolean): string => {
    return isOutdoor
        ? "outdoor fashion runway: extended catwalk, open-air truss structures, audience risers, skyline panorama; clean graphic geometry"
        : "indoor fashion runway: glossy catwalk, spotlight cones, truss rigs, light haze; audience softly blurred; precise graphic geometry";
};

export const _runway_lighting = (isOutdoor: boolean): string => {
    return "runway top-light with crisp facial exposure and controlled edge rim along the catwalk; clean shadow edges; invisible sources; no visible equipment";
};

export const _sanitize_runway = (text: string): string => {
    let sanitized = text;
    // Nudge any accidental indoor words back to runway language
    sanitized = sanitized.replace(/\b(corridor|hall|room|office|lobby|interior)\b/gi, "runway");
    sanitized = sanitized.replace(/\bwindow[- ]motivated\b/gi, "runway spotlighting");
    return sanitized;
};


// --- Context detection ---
const detectContext = (vibeText: string): string[] => {
    const v = (vibeText || "").toLowerCase();
    const ctx: string[] = [];

    // Runway (high priority)
    if (v.includes("runway") || v.includes("catwalk")) ctx.push("runway");

    // Sports / Active
    if (v.includes("tennis")) ctx.push("tennis");
    if (v.includes("basketball")) ctx.push("basketball");
    if (v.includes("horse") || v.includes("equestrian") || v.includes("riding")) ctx.push("horse_riding");
    if (v.includes("pilates") || v.includes("reformer")) ctx.push("pilates");
    if (v.includes("boxing") || v.includes("punching bag") || v.includes("punch")) ctx.push("boxing");
    if (v.includes("ski") || v.includes("snowboard") || ["alps", "snow", "mountain", "winter"].some(k => v.includes(k))) ctx.push("skiing");
    if (v.includes("swim") || v.includes("pool") || ["beach", "coast", "villa", "seaside", "coastal"].some(k => v.includes(k))) ctx.push("swimwear");
    if (v.includes("cycle") || v.includes("bike")) ctx.push("cycling");
    if (v.includes("run") || v.includes("jog")) ctx.push("running");
    if (v.includes("yoga") || v.includes("meditate")) ctx.push("yoga");
    if (v.includes("golf")) ctx.push("golf");
    if (v.includes("hike") || v.includes("trek")) ctx.push("hiking");
    if (v.includes("dance") || v.includes("ballet")) ctx.push("dance");
    if (v.includes("skate")) ctx.push("skating");
    if (v.includes("gym") || v.includes("lift") || v.includes("weights")) ctx.push("gym");

    // Lifestyle / Travel
    if (v.includes("airport") || v.includes("travel")) ctx.push("airport");
    if (v.includes("cafe") || v.includes("coffee") || v.includes("café")) ctx.push("cafe");
    if (v.includes("brunch") || v.includes("restaurant") || v.includes("dinner")) ctx.push("brunch");
    if (v.includes("red carpet") || v.includes("gala")) ctx.push("redcarpet");
    if (v.includes("festival") || v.includes("coachella") || v.includes("desert")) ctx.push("festival");
    if (v.includes("yacht") || v.includes("sail") || v.includes("boat")) ctx.push("yacht");
    if (v.includes("winery") || v.includes("vineyard")) ctx.push("vineyard");
    if (v.includes("spa") || v.includes("wellness") || v.includes("retreat")) ctx.push("spa");
    if (v.includes("private jet") || v.includes("jet")) ctx.push("jet");

    // Seasonal / Location
    if (v.includes("christmas") || v.includes("holiday market") || v.includes("winter market")) ctx.push("christmas");
    if (v.includes("picnic")) ctx.push("picnic");
    if (v.includes("rain") || v.includes("umbrella")) ctx.push("rainy");

    // Professional / Everyday
    if (v.includes("office") || v.includes("boardroom") || v.includes("work")) ctx.push("office");
    if (v.includes("gallery") || v.includes("museum")) ctx.push("gallery");
    if (v.includes("shopping") || v.includes("boutique")) ctx.push("shopping");

    return Array.from(new Set(ctx)); // Use Set to avoid duplicates
};


/**
 * Returns a single, varied, on-trend outfit string.
 * - Honors user_outfit if provided.
 * - Pulls from context (tennis, street, Alps...) first if a context is detected.
 * - Otherwise, falls back to the style-based outfit pool.
 */
export const chooseOutfit = (vibeText: string, styleKey: string = "General", userOutfit: string = ""): string => {
    if (userOutfit.trim()) {
        return userOutfit.trim();
    }

    const contexts = detectContext(vibeText);
    let candidates: string[] = [];

    // 1. Context candidates (highest priority)
    contexts.forEach(c => {
        if (CONTEXT_OUTFITS[c]) {
            candidates = candidates.concat(CONTEXT_OUTFITS[c]);
        }
    });

    // 2. Style pool (if no context candidates)
    if (candidates.length === 0) {
        const stylePool = OUTFITS_BY_STYLE[styleKey] || OUTFITS_BY_STYLE["General"];
        candidates = candidates.concat(stylePool);
    }
    
    // 3. Fallback if somehow empty
    if (candidates.length === 0) {
        candidates = OUTFITS_BY_STYLE["General"];
    }

    return pick(candidates);
};


const OUTDOOR_HINTS = new Set([
    "outdoor", "outside", "open air", "open-air", "street", "alley", "crosswalk",
    "rooftop", "roof", "beach", "coast", "boardwalk", "park", "garden", "forest",
    "tennis", "basketball", "court", "stadium", "track", "field", "alps", "mountain", "snow",
    "runway", "catwalk"
]);
const SURFACE_WORDS = new Set(["court", "field", "beach", "roof", "rooftop", "boardwalk", "street", "runway", "track", "catwalk"]);

interface CleanVibeResult {
  scenePhrase: string;
  isOutdoor: boolean;
  surface: string | null;
}

/**
 * Normalizes a user's vibe into a clean phrase and detects environmental context.
 * @param vibe The user's input vibe string.
 * @returns An object containing the cleaned scene phrase and context flags.
 */
export const cleanVibe = (vibe: string): CleanVibeResult => {
  let raw = (vibe || "").trim();

  // strip leading subject verbs
  raw = raw.replace(/^\s*(a|the)?\s*(woman|girl|model|subject)\s+is\s+/i, "");
  raw = raw.replace(/^\s*she\s+is\s+/i, "");
  raw = raw.replace(/^\s*(a|the)\s+/i, "");
  raw = raw.replace(/^\s*is\s+/i, "");

  // grammar touch-ups
  raw = raw.replace(/\bnear\s+snowy\s+alps\b/i, "near the snowy Alps");
  raw = raw.replace(/\balps\b/i, "Alps");

  // detect outdoor intent
  const lowerRaw = raw.toLowerCase();
  const toks = new Set(lowerRaw.match(/[a-z]+/g) || []);
  const isOutdoor = Array.from(toks).some(w => OUTDOOR_HINTS.has(w));
  
  const surface: string | null = Array.from(SURFACE_WORDS).find(w => toks.has(w)) || null;

  // choose connector
  const connector = surface ? "on" : (isOutdoor ? "at" : "in");
  
  const scenePhrase = `${connector} ${raw}`.trim();


  return { scenePhrase, isOutdoor, surface };
};

/**
 * Generates a detailed SCENE description that matches the vibe,
 * preventing mismatches from presets.
 * @param vibe The user's input vibe string.
 * @returns A detailed scene description string.
 */
export const sceneFromVibe = (vibe: string, isOutdoor: boolean): string => {
    const vl = (vibe || "").toLowerCase();

    if (vl.includes("runway") || vl.includes("catwalk")) {
        return _runway_scene_block(isOutdoor);
    }
    if (vl.includes("tennis")) {
        return "outdoor luxury tennis court with clean painted lines, mesh fencing, courtside seating, clear sky";
    }
    if (vl.includes("basketball")) {
        return "outdoor city basketball court with painted asphalt, chain-link fence, subtle skyline in background, clean sideline markings";
    }
    if (["beach","coast","boardwalk","seaside"].some(k => vl.includes(k))) {
        return "coastal boardwalk with pastel horizon and gentle sea reflections";
    }
    if (["alps","snow","mountain","winter"].some(k => vl.includes(k))) {
        return "restaurant terrace with marble tables and panoramic snowy Alps; crisp alpine air";
    }
    if (["cafe","café","restaurant","breakfast","brunch"].some(k => vl.includes(k))) {
        return isOutdoor
            ? "open-air terrace café with linen tables and refined décor"
            : "sunlit café/restaurant setting with linen tables and refined décor";
    }
    // fallback
    return isOutdoor
        ? "open-air upscale environment matching the description"
        : "upscale environment matching the description";
};

// --- Post-processing functions for specific styles ---

/**
 * Tries to pull a user-specified outfit from the vibe/scenario text.
 * Looks for phrases after 'wearing', 'outfit', 'dressed in', 'in a/an', etc.
 * Returns '' if nothing reliable is found.
 */
export const extractOutfitFromVibe = (vibeText: string): string => {
    if (!vibeText) {
        return "";
    }

    let v = vibeText.trim().replace(/\s+/g, " ");

    const patterns = [
        /(?:wearing|she\s+wears|outfit\s*[:\-])\s*([^\.]+)/i,
        /(?:dressed\s+in|in\s+an?)\s*([^\.]+?)(?:\s+outfit|\.)/i,
        /(?:wardrobe\s*[:\-])\s*([^\.]+)/i,
    ];

    for (const pat of patterns) {
        const m = v.match(pat);
        if (m && m[1]) {
            let candidate = m[1].trim();
            // Trim trailing fillers and punctuation
            candidate = candidate.replace(/\b(vibe|style|setting|scene)\b.*$/i, "").replace(/[,;:.\s]*$/, "");
            
            const sceneWordRegex = /\b(street|rooftop|café|studio|runway|beach|court|alps|mountain|yacht|pool)\b/i;
            
            // Avoid false positives from short phrases or scene descriptions
            if (candidate.split(/\s+/).length >= 3 && !sceneWordRegex.test(candidate)) {
                return candidate;
            }
        }
    }

    return "";
};

// --- General Passthrough Preset Helpers ---

const _aimuse_light_from_vibe = (v: string): string => {
    const vibe = (v || "").toLowerCase();
    if (["night", "neon", "club", "street at night", "after dark"].some(k => vibe.includes(k))) {
        // night: crisp flash or cinematic practicals, always face-forward
        return "night scene: on/off-camera flash for crisp facial highlights, clean catchlights in both eyes, controlled speculars; practicals and neon as background bokeh; no blown highlights on skin; invisible sources";
    }
    if (["sunset", "golden hour", "dawn"].some(k => vibe.includes(k))) {
        return "golden hour: warm rim from back-right, soft bounce fill under chin, round catchlights, clean shadow edge; invisible sources";
    }
    if (["outdoor", "outside", "beach", "rooftop", "garden", "street", "park", "yacht", "terrace", "balcony"].some(k => vibe.includes(k))) {
        return "daylight: sky-motivated soft key, ground bounce fill, even facial exposure, round catchlights; no cross-shadows; invisible sources";
    }
    // indoor default
    return "editorial window-softbox key with reflector fill; crisp catchlights; balanced micro-contrast; believable contact shadows; invisible sources";
};

const _strip_outfit_clause = (vibeText: string): string => {
    let v = vibeText || "";
    v = v.replace(/(?:wearing|she\s+wears|outfit\s*[:\-])([^\.]+)\.?/gi, "");
    v = v.replace(/(?:dressed\s+in|in\s+an?\s)([^\.]+?)(?:\s+outfit|\.)/gi, "");
    v = v.replace(/(?:wardrobe\s*[:\-])([^\.]+)\.?/gi, "");
    return v.replace(/\s+/g, " ").trim().replace(/^[ .]+|[ .]+$/g, "");
};

/**
 * Preset 'General': use user's vibe/scenario verbatim; keep AiMUSE polish.
 * - If user typed an outfit -> use it. If manual outfit provided -> don't touch.
 * - Replaces SCENE with the user's vibe (minus outfit words).
 * - Replaces LIGHTING with AiMUSE lighting inferred from the vibe.
 */
export const applyGeneralPassthrough = (promptText: string, styleLabel: string, vibeText: string = "", outfitLocked: boolean = false): string => {
    if ((styleLabel || "").trim().toLowerCase() !== "general") {
        return promptText;
    }

    let txt = promptText;
    const sceneLine = _strip_outfit_clause(vibeText) || "as described by the user in a coherent, visually rich setting";
    
    // 1) LEAD PARAGRAPH SCENE ← user vibe (cleaned)
    // This is the critical fix to prevent indoor/outdoor mismatch.
    txt = txt.replace(/(lifestyle\/editorial capture\s)(.*?)(\. Wearing)/is, `$1${sceneLine}$3`);

    // 2) SCENE BLOCK ← user vibe (cleaned)
    txt = txt.replace(/(SCENE:\s*\n)(.*?)(\nLIGHTING:)/is, `$1${sceneLine}$3`);

    // 3) OUTFIT ← user outfit (if any and not locked)
    if (!outfitLocked) {
        const userOutfit = extractOutfitFromVibe(vibeText);
        if (userOutfit) {
             txt = txt.replace(/(Wearing\s)(.*?)(\.)/i, `$1${userOutfit}$3`);
        }
    }

    // 4) LIGHTING ← AiMUSE quality lighting inferred from vibe
    const light = _aimuse_light_from_vibe(vibeText);
    txt = txt.replace(/(LIGHTING:\s*\n)(.*?)(\nOPTICS:)/is, `$1${light}$3`);

    return txt;
};

export const applyCinematicVariation = (promptText: string, vibeText: string = "", outfitLocked: boolean = false): string => {
    let scenes = CINEMATIC_SCENARIOS;
    if ((vibeText || "").toLowerCase().includes("outdoor")) {
        const outdoorBias = scenes.filter(s => ["rooftop", "yacht", "street", "bar", "airport", "ocean"].some(w => s.includes(w)));
        if (outdoorBias.length > 0) {
            scenes = outdoorBias;
        }
    }
    const scene = pick(scenes);
    
    let txt = promptText.replace(/(SCENE:\s*\n)(.*?)(\nLIGHTING:)/is, `$1${scene}$3`);

    if (!outfitLocked) {
        const userOutfit = extractOutfitFromVibe(vibeText);
        if (userOutfit) {
             // Use exactly what the user wrote
             txt = txt.replace(/(Wearing\s)(.*?)(\.)/i, `$1${userOutfit}$3`);
        } else {
            const outfit = pick(CINEMATIC_WARDROBE);
            const accessory = pick(CINEMATIC_ACCESSORIES);
            txt = txt.replace(/(Wearing\s)(.*?)(\.)/i, `$1${outfit}, styled with ${accessory}$3`);
        }
    }
    
    return txt;
};

export const applyEditorialOutfits = (promptText: string, styleLabel: string, vibeText: string = "", outfitLocked: boolean = false): string => {
    if ((styleLabel || "").trim().toLowerCase() !== "editorial" || outfitLocked) {
        return promptText;
    }
    
    const userOutfit = extractOutfitFromVibe(vibeText);
    if (userOutfit) {
        return promptText.replace(
            /(Wearing\s)(.*?)(\.)/i,
            `$1${userOutfit}$3`
        );
    }
    
    const outfit = pick(EDITORIAL_WARDROBE_CLEAN);
    const accessory = pick(EDITORIAL_ACCESSORIES_CLEAN);
    
    return promptText.replace(
        /(Wearing\s)(.*?)(\.)/i,
        `$1${outfit}, styled with ${accessory}$3`
    );
};

export const applyOldMoneyVariation = (promptText: string, styleLabel: string, vibeText: string = "", outfitLocked: boolean = false): string => {
    if ((styleLabel || "").trim().toLowerCase() !== "old money") {
        return promptText;
    }

    const scene = pick(OLDMONEY_SCENARIOS);

    let txt = promptText.replace(/(SCENE:\s*\n)(.*?)(\nLIGHTING:)/is, `$1${scene}$3`);

    if (!outfitLocked) {
        const outfit = pick(OLDMONEY_WARDROBE);
        const accessory = pick(OLDMONEY_ACCESSORIES);
        txt = txt.replace(
            /(Wearing\s)(.*?)(\.)/i,
            `$1${outfit}, styled with ${accessory}$3`
        );
    }

    return txt;
};

export const applyCleanGirlVariation = (promptText: string, styleLabel: string, vibeText: string = "", outfitLocked: boolean = false): string => {
    const normalizedStyle = (styleLabel || "").trim().toLowerCase();
    if (normalizedStyle !== "clean girl aesthetic" && normalizedStyle !== "minimalist chic") {
        return promptText;
    }

    let scenes = CLEAN_GIRL_SCENARIOS;
    if ((vibeText || "").toLowerCase().includes("outdoor")) {
        const outdoorKeywords = ["terrace", "balcony", "rooftop", "café", "villa", "yacht", "courtyard", "santorini", "amalfi", "mykonos", "positano", "ibiza"];
        const outdoorBias = scenes.filter(s => outdoorKeywords.some(w => s.includes(w)));
        if (outdoorBias.length > 0) {
            scenes = outdoorBias;
        }
    }
    const scene = pick(scenes);

    let txt = promptText.replace(/(SCENE:\s*\n)(.*?)(\nLIGHTING:)/is, `$1${scene}$3`);

    if (!outfitLocked) {
        const outfit = pick(CLEAN_GIRL_WARDROBE);
        const accessory = pick(CLEAN_GIRL_ACCESSORIES);
        txt = txt.replace(
            /(Wearing\s)(.*?)(\.)/i,
            `$1${outfit}, styled with ${accessory}$3`
        );
    }

    return txt;
};

export const applyHyperrealBeautyVariation = (promptText: string, styleLabel: string, vibeText: string = "", outfitLocked: boolean = false): string => {
    const normalizedStyle = (styleLabel || "").trim().toLowerCase();
    if (normalizedStyle !== "hyper-real beauty" && normalizedStyle !== "hyperreal beauty") {
        return promptText;
    }

    // --- Force beauty framing ---
    const beautyShots = [
        "tight close-up focusing on face and shoulders",
        "beauty mid-shot capturing neckline and upper torso",
        "extreme close-up of face with sharp focus on eyes and lips",
    ];
    const shot = pick(beautyShots);
    let txt = promptText.replace(/(SHOT:\s*\n)(.*?)(\nSCENE:)/is, `$1${shot}$3`);

    // --- Inject scene ---
    const scene = pick(HYPERREAL_BEAUTY_SCENARIOS);
    txt = txt.replace(/(SCENE:\s*\n)(.*?)(\nLIGHTING:)/is, `$1${scene}$3`);

    // --- Inject outfit if no override ---
    if (!outfitLocked) {
        const outfit = pick(HYPERREAL_BEAUTY_WARDROBE);
        const accessory = pick(HYPERREAL_BEAUTY_ACCESSORIES);
        txt = txt.replace(
            /(Wearing\s)(.*?)(\.)/i,
            `$1${outfit}, styled with ${accessory}$3`
        );
    }

    return txt;
};

export const applyPinterestLifestyleVariation = (promptText: string, styleLabel: string, vibeText: string = "", outfitLocked: boolean = false): string => {
    const normalizedStyle = (styleLabel || "").trim().toLowerCase();
    if (normalizedStyle !== "pinterest lifestyle" && normalizedStyle !== "pinterest") {
        return promptText;
    }

    // --- Scene injection ---
    const scene = pick(PINTEREST_LIFESTYLE_SCENARIOS);
    let txt = promptText.replace(/(SCENE:\s*\n)(.*?)(\nLIGHTING:)/is, `$1${scene}$3`);

    // --- Wardrobe & accessories ---
    if (!outfitLocked) {
        const outfit = pick(PINTEREST_LIFESTYLE_WARDROBE);
        const accessory = pick(PINTEREST_LIFESTYLE_ACCESSORIES);
        txt = txt.replace(
            /(Wearing\s)(.*?)(\.)/i,
            `$1${outfit}, styled with ${accessory}$3`
        );
    }

    return txt;
};

export const applySurrealLuxuryVariation = (promptText: string, styleLabel: string, vibeText: string = "", outfitLocked: boolean = false): string => {
    const normalizedStyle = (styleLabel || "").trim().toLowerCase();
    if (normalizedStyle !== "surreal luxury" && normalizedStyle !== "surreal") {
        return promptText;
    }

    // --- Scene ---
    const scene = pick(SURREAL_LUXURY_SCENARIOS);
    let txt = promptText.replace(/(SCENE:\s*\n)(.*?)(\nLIGHTING:)/is, `$1${scene}$3`);

    // --- Wardrobe + accessories ---
    if (!outfitLocked) {
        const outfit = pick(SURREAL_LUXURY_WARDROBE);
        const accessory = pick(SURREAL_LUXURY_ACCESSORIES);
        txt = txt.replace(
            /(Wearing\s)(.*?)(\.)/i,
            `$1${outfit}, styled with ${accessory}$3`
        );
    }

    return txt;
};

export const applyStreetStyleVariation = (promptText: string, styleLabel: string, vibeText: string = "", outfitLocked: boolean = false): string => {
    const normalizedStyle = (styleLabel || "").trim().toLowerCase();
    if (normalizedStyle !== "street style" && normalizedStyle !== "street") {
        return promptText;
    }

    // --- Scene ---
    const scene = pick(STREET_STYLE_SCENARIOS);
    let txt = promptText.replace(/(SCENE:\s*\n)(.*?)(\nLIGHTING:)/is, `$1${scene}$3`);

    // --- Wardrobe + accessories ---
    if (!outfitLocked) {
        const outfit = pick(STREET_STYLE_WARDROBE);
        const accessory = pick(STREET_STYLE_ACCESSORIES);
        txt = txt.replace(
            /(Wearing\s)(.*?)(\.)/i,
            `$1${outfit}, styled with ${accessory}$3`
        );
    }
    
    // --- Lighting ---
    const sceneLower = scene.toLowerCase();
    if (sceneLower.includes("night") || sceneLower.includes("neon") || sceneLower.includes("flash")) {
        txt = txt.replace(
            /(LIGHTING:\s*\n)(.*?)(\nOPTICS:)/is,
            `$1direct paparazzi-style flash with sharp facial highlights, neon glow accents, crisp contrast, reflective puddles or glass for depth$3`
        );
    } else {
        txt = txt.replace(
            /(LIGHTING:\s*\n)(.*?)(\nOPTICS:)/is,
            `$1golden hour sunlight with warm rim and reflective bounce, cinematic street softness, subtle lens flare$3`
        );
    }

    return txt;
};