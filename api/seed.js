import { prisma } from './lib/prisma.js';

// Seed data - matches existing mock data
const restaurants = [
  { id: "rest-001", name: "Bella Notte", initials: "BN", color: "#8B0000", location: "San Francisco, CA" },
  { id: "rest-002", name: "Sakura Garden", initials: "SG", color: "#DC143C", location: "San Francisco, CA" },
  { id: "rest-003", name: "The Rustic Spoon", initials: "RS", color: "#8B4513", location: "Oakland, CA" },
  { id: "rest-004", name: "Côte d'Azur", initials: "CA", color: "#000080", location: "New York, NY" },
  { id: "rest-005", name: "Taco Libre", initials: "TL", color: "#FF6B35", location: "Los Angeles, CA" },
  { id: "rest-006", name: "The Golden Fork", initials: "GF", color: "#DAA520", location: "Chicago, IL" }
];

const reviewers = [
  {
    id: "rev-001", displayName: "EliteFoodie2019", realNameInitial: "M",
    platforms: ["yelp", "instagram"], handles: { yelp: "EliteFoodie2019", instagram: "@elitefoodie.sf" },
    location: "San Francisco, CA", publicReviewCount: 847, memberSince: "2019",
    eliteStatus: true, eliteYears: ["2020", "2021", "2022", "2023"],
    aggregateRating: 4.2, totalRestaurantReviews: 23,
    tags: ["fair-critic", "detailed-reviews", "high-standards"],
    bio: "Bay Area native. Yelp Elite '20-'23. I photograph everything.", recentActivity: "2 days ago"
  },
  {
    id: "rev-002", displayName: "HangryHank", realNameInitial: "H",
    platforms: ["google", "yelp"], handles: { google: "Hank M.", yelp: "HangryHank88" },
    location: "Oakland, CA", publicReviewCount: 234, memberSince: "2018",
    eliteStatus: false, aggregateRating: 1.8, totalRestaurantReviews: 31,
    tags: ["revenge-reviewer", "exaggerates", "difficult"],
    bio: "Telling it like it is since 2018.", recentActivity: "5 hours ago"
  },
  {
    id: "rev-003", displayName: "BrunchQueen_SF", realNameInitial: "S",
    platforms: ["instagram", "yelp", "tiktok"], handles: { instagram: "@brunchqueen_sf", yelp: "BrunchQueenSF", tiktok: "@brunchqueensf" },
    location: "San Francisco, CA", publicReviewCount: 156, memberSince: "2020",
    eliteStatus: false, followers: 12400, aggregateRating: 3.9, totalRestaurantReviews: 18,
    tags: ["influencer", "photographer", "pleasant", "long-visits"],
    bio: "12K followers | Brunch is a lifestyle | DM for collabs 💅", recentActivity: "1 day ago"
  },
  {
    id: "rev-004", displayName: "TheRealCritic", realNameInitial: "R",
    platforms: ["yelp"], handles: { yelp: "TheRealCritic_NYC" },
    location: "New York, NY", publicReviewCount: 1203, memberSince: "2015",
    eliteStatus: true, eliteYears: ["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"],
    aggregateRating: 3.5, totalRestaurantReviews: 45,
    tags: ["accurate", "harsh-tone", "knowledgeable", "detailed-reviews"],
    bio: "Former line cook. I know what goes on in kitchens. 8x Elite.", recentActivity: "12 hours ago"
  },
  {
    id: "rev-005", displayName: "FreebieFiona", realNameInitial: "F",
    platforms: ["yelp", "google"], handles: { yelp: "FionaFindsDeals", google: "Fiona T." },
    location: "Los Angeles, CA", publicReviewCount: 156, memberSince: "2019",
    eliteStatus: false, aggregateRating: 2.1, totalRestaurantReviews: 27,
    tags: ["freebie-hunter", "threatens-reviews", "complainer"],
    bio: "Looking for the best value in LA!", recentActivity: "3 days ago"
  },
  {
    id: "rev-006", displayName: "GentlemanGourmand", realNameInitial: "W",
    platforms: ["yelp", "opentable"], handles: { yelp: "GentlemanGourmand", opentable: "William R." },
    location: "Chicago, IL", publicReviewCount: 567, memberSince: "2014",
    eliteStatus: true, eliteYears: ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"],
    aggregateRating: 4.8, totalRestaurantReviews: 34,
    tags: ["great-tipper", "respectful", "old-school", "fair-critic"],
    bio: "Retired attorney. Dining enthusiast. 25%+ tipper.", recentActivity: "1 week ago"
  },
  {
    id: "rev-007", displayName: "VeganVigilante", realNameInitial: "A",
    platforms: ["google", "happycow"], handles: { google: "Alex P.", happycow: "VeganVigilante" },
    location: "Portland, OR", publicReviewCount: 89, memberSince: "2021",
    eliteStatus: false, aggregateRating: 2.9, totalRestaurantReviews: 15,
    tags: ["dietary-militant", "lecture-prone", "specific-requests"],
    bio: "Vegan 7 years. Animals are friends not food. Will ask about your oil.", recentActivity: "4 days ago"
  },
  {
    id: "rev-008", displayName: "DateNightDave", realNameInitial: "D",
    platforms: ["yelp", "google"], handles: { yelp: "DateNightDave", google: "David K." },
    location: "Austin, TX", publicReviewCount: 45, memberSince: "2022",
    eliteStatus: false, aggregateRating: 4.5, totalRestaurantReviews: 12,
    tags: ["polite", "celebrates-occasions", "good-tipper", "appreciative"],
    bio: "Taking my wife to nice places one restaurant at a time.", recentActivity: "2 weeks ago"
  },
  {
    id: "rev-009", displayName: "KarenKravings", realNameInitial: "K",
    platforms: ["yelp", "google", "facebook"], handles: { yelp: "Karen_Foodie_Mom", google: "Karen W.", facebook: "Karen's Food Reviews" },
    location: "Scottsdale, AZ", publicReviewCount: 312, memberSince: "2017",
    eliteStatus: false, aggregateRating: 1.5, totalRestaurantReviews: 52,
    tags: ["manager-caller", "unreasonable", "loud", "difficult"],
    bio: "I know what good service looks like. Manager on speed dial.", recentActivity: "6 hours ago"
  },
  {
    id: "rev-010", displayName: "SilentSampler", realNameInitial: "J",
    platforms: ["google"], handles: { google: "James L." },
    location: "Seattle, WA", publicReviewCount: 678, memberSince: "2016",
    eliteStatus: false, aggregateRating: 3.7, totalRestaurantReviews: 8,
    tags: ["stealth-reviewer", "fair-critic", "no-disclosure"],
    bio: "Local guide. Just sharing my experiences.", recentActivity: "3 days ago"
  },
  {
    id: "rev-011", displayName: "InfluencerIvy", realNameInitial: "I",
    platforms: ["instagram", "tiktok", "yelp"], handles: { instagram: "@ivy.eats.world", tiktok: "@ivyeatsworld", yelp: "IvyEatsWorld" },
    location: "Miami, FL", publicReviewCount: 89, memberSince: "2021",
    followers: 45000, aggregateRating: 2.3, totalRestaurantReviews: 29,
    tags: ["influencer", "expects-comps", "content-creator", "entitled"],
    bio: "45K | Food & lifestyle | Partnerships: dm@ivyeats.com", recentActivity: "8 hours ago"
  },
  {
    id: "rev-012", displayName: "HonestHarold", realNameInitial: "H",
    platforms: ["yelp", "tripadvisor"], handles: { yelp: "HonestHarold_Reviews", tripadvisor: "HaroldT" },
    location: "Denver, CO", publicReviewCount: 234, memberSince: "2018",
    eliteStatus: false, aggregateRating: 4.1, totalRestaurantReviews: 19,
    tags: ["brutally-honest", "fair-critic", "constructive", "detailed-reviews"],
    bio: "I call it like I see it. Fair but honest.", recentActivity: "5 days ago"
  },
  {
    id: "rev-013", displayName: "NitpickNancy", realNameInitial: "N",
    platforms: ["yelp", "google"], handles: { yelp: "NancyNoticesEverything", google: "Nancy R." },
    location: "Boston, MA", publicReviewCount: 189, memberSince: "2019",
    eliteStatus: false, aggregateRating: 2.4, totalRestaurantReviews: 33,
    tags: ["nitpicker", "impossible-standards", "complainer"],
    bio: "The devil is in the details. And I find every one.", recentActivity: "1 day ago"
  },
  {
    id: "rev-014", displayName: "RegularRick", realNameInitial: "R",
    platforms: ["google"], handles: { google: "Rick M." },
    location: "Phoenix, AZ", publicReviewCount: 56, memberSince: "2020",
    eliteStatus: false, aggregateRating: 4.4, totalRestaurantReviews: 7,
    tags: ["low-key", "reasonable", "fair-critic", "appreciative"],
    bio: "Just a regular guy who likes good food.", recentActivity: "2 weeks ago"
  },
  {
    id: "rev-015", displayName: "ChefChaser", realNameInitial: "C",
    platforms: ["yelp", "instagram", "eater"], handles: { yelp: "ChefChaser", instagram: "@chefchaser", eater: "ChefChaser" },
    location: "San Francisco, CA", publicReviewCount: 934, memberSince: "2013",
    eliteStatus: true, eliteYears: ["2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"],
    aggregateRating: 4.6, totalRestaurantReviews: 41,
    tags: ["industry-insider", "respectful", "knowledgeable", "fair-critic"],
    bio: "10x Elite. Former BOH. I get it. Here for the food, not the drama.", recentActivity: "4 hours ago"
  }
];

const tagTypes = [
  { tagKey: "fair-critic", label: "Fair Critic", type: "positive" },
  { tagKey: "detailed-reviews", label: "Detailed Reviews", type: "neutral" },
  { tagKey: "high-standards", label: "High Standards", type: "neutral" },
  { tagKey: "revenge-reviewer", label: "Revenge Reviewer", type: "negative" },
  { tagKey: "exaggerates", label: "Exaggerates", type: "negative" },
  { tagKey: "difficult", label: "Difficult", type: "negative" },
  { tagKey: "influencer", label: "Influencer", type: "neutral" },
  { tagKey: "photographer", label: "Photographs Everything", type: "neutral" },
  { tagKey: "pleasant", label: "Pleasant", type: "positive" },
  { tagKey: "long-visits", label: "Long Visits", type: "warning" },
  { tagKey: "accurate", label: "Accurate Reviews", type: "positive" },
  { tagKey: "harsh-tone", label: "Harsh Tone", type: "warning" },
  { tagKey: "knowledgeable", label: "Knowledgeable", type: "positive" },
  { tagKey: "freebie-hunter", label: "Freebie Hunter", type: "negative" },
  { tagKey: "threatens-reviews", label: "Threatens Bad Reviews", type: "negative" },
  { tagKey: "complainer", label: "Serial Complainer", type: "negative" },
  { tagKey: "great-tipper", label: "Great Tipper", type: "positive" },
  { tagKey: "respectful", label: "Respectful", type: "positive" },
  { tagKey: "old-school", label: "Old School", type: "neutral" },
  { tagKey: "dietary-militant", label: "Dietary Militant", type: "warning" },
  { tagKey: "lecture-prone", label: "Lecture Prone", type: "warning" },
  { tagKey: "specific-requests", label: "Many Special Requests", type: "warning" },
  { tagKey: "polite", label: "Polite", type: "positive" },
  { tagKey: "celebrates-occasions", label: "Celebrates Occasions", type: "positive" },
  { tagKey: "good-tipper", label: "Good Tipper", type: "positive" },
  { tagKey: "appreciative", label: "Appreciative", type: "positive" },
  { tagKey: "manager-caller", label: "Manager Caller", type: "negative" },
  { tagKey: "unreasonable", label: "Unreasonable", type: "negative" },
  { tagKey: "loud", label: "Loud", type: "warning" },
  { tagKey: "stealth-reviewer", label: "Stealth Reviewer", type: "neutral" },
  { tagKey: "no-disclosure", label: "No Disclosure", type: "neutral" },
  { tagKey: "expects-comps", label: "Expects Comps", type: "negative" },
  { tagKey: "content-creator", label: "Content Creator", type: "neutral" },
  { tagKey: "entitled", label: "Entitled", type: "negative" },
  { tagKey: "brutally-honest", label: "Brutally Honest", type: "neutral" },
  { tagKey: "constructive", label: "Constructive", type: "positive" },
  { tagKey: "nitpicker", label: "Nitpicker", type: "negative" },
  { tagKey: "impossible-standards", label: "Impossible Standards", type: "negative" },
  { tagKey: "low-key", label: "Low-Key", type: "positive" },
  { tagKey: "reasonable", label: "Reasonable", type: "positive" },
  { tagKey: "industry-insider", label: "Industry Insider", type: "positive" }
];

const flagTypes = [
  { flagKey: "threatened-review", label: "Threatened Bad Review", type: "negative" },
  { flagKey: "fabricated-claims", label: "Fabricated Claims", type: "negative" },
  { flagKey: "undertipped", label: "Undertipped", type: "warning" },
  { flagKey: "unreasonable-complaints", label: "Unreasonable Complaints", type: "warning" },
  { flagKey: "exaggerated-claims", label: "Exaggerated Claims", type: "warning" },
  { flagKey: "solicited-freebies", label: "Solicited Freebies", type: "warning" },
  { flagKey: "retaliatory-review", label: "Retaliatory Review", type: "negative" },
  { flagKey: "long-table-time", label: "Long Table Time", type: "neutral" },
  { flagKey: "lectured-staff", label: "Lectured Staff", type: "warning" },
  { flagKey: "made-staff-cry", label: "Made Staff Cry", type: "negative" },
  { flagKey: "unreasonable-demands", label: "Unreasonable Demands", type: "warning" },
  { flagKey: "manager-demanded", label: "Demanded Manager", type: "warning" },
  { flagKey: "repeat-offender", label: "Repeat Offender", type: "negative" },
  { flagKey: "demanded-comps", label: "Demanded Comps", type: "warning" },
  { flagKey: "minimal-order", label: "Minimal Order", type: "neutral" },
  { flagKey: "impossible-standards", label: "Impossible Standards", type: "warning" },
  { flagKey: "excessive-complaints", label: "Excessive Complaints", type: "warning" },
  { flagKey: "caused-scene", label: "Caused a Scene", type: "negative" },
  { flagKey: "solicited-discount", label: "Solicited Discount", type: "warning" }
];

const reviews = [
  { id: "review-001", reviewerId: "rev-001", restaurantId: "rest-001", rating: 4, date: "2024-01-15", content: "Recognized her from her Yelp profile. She was thorough—photographed every course, asked detailed questions about ingredients. Fair review afterward that accurately captured the experience. Tipped 20%.", categories: { accuracy: 5, tipping: 4, politeness: 4, staffTreatment: 4, disclosed: false, reasonable: 5 }, flags: [], helpful: 12, verified: true },
  { id: "review-002", reviewerId: "rev-001", restaurantId: "rest-002", rating: 4, date: "2023-11-20", content: "Elite badge holder, clearly takes reviewing seriously. Spent 2+ hours, ordered extensively. Her review mentioned things we could actually improve. Would welcome back.", categories: { accuracy: 5, tipping: 4, politeness: 5, staffTreatment: 4, disclosed: false, reasonable: 4 }, flags: [], helpful: 8, verified: true },
  { id: "review-003", reviewerId: "rev-002", restaurantId: "rest-003", rating: 1, date: "2024-02-01", content: "Absolute nightmare. Complained food took too long (15 min on a Saturday night). Demanded discount, threatened '1-star incoming' when we declined. His review claimed 45 minute wait and 'cold food'—completely fabricated.", categories: { accuracy: 1, tipping: 1, politeness: 1, staffTreatment: 1, disclosed: true, reasonable: 1 }, flags: ["threatened-review", "fabricated-claims", "undertipped"], helpful: 34, verified: true },
  { id: "review-004", reviewerId: "rev-002", restaurantId: "rest-001", rating: 2, date: "2023-09-14", content: "Sent back his pasta twice. Both times nothing was actually wrong—chef tasted it personally. Left 10% tip and a 2-star review complaining about 'attitude' when server remained professional throughout.", categories: { accuracy: 2, tipping: 2, politeness: 2, staffTreatment: 2, disclosed: false, reasonable: 1 }, flags: ["undertipped", "unreasonable-complaints"], helpful: 28, verified: true },
  { id: "review-005", reviewerId: "rev-002", restaurantId: "rest-005", rating: 2, date: "2024-01-08", content: "Got upset that our casual taco spot doesn't take reservations. Waited 20 min, complained the whole time to other customers. Review said 'disorganized chaos' but we were just busy on a Friday.", categories: { accuracy: 2, tipping: 2, politeness: 2, staffTreatment: 3, disclosed: false, reasonable: 2 }, flags: ["exaggerated-claims"], helpful: 15, verified: true },
  { id: "review-006", reviewerId: "rev-003", restaurantId: "rest-001", rating: 4, date: "2024-01-22", content: "Instagram influencer, asked to move tables twice for better lighting. But she was polite about it, her content looked great, and she was genuinely complimentary. Just budget extra time at the table.", categories: { accuracy: 4, tipping: 4, politeness: 5, staffTreatment: 4, disclosed: true, reasonable: 4 }, flags: ["long-table-time"], helpful: 9, verified: true },
  { id: "review-007", reviewerId: "rev-003", restaurantId: "rest-002", rating: 4, date: "2023-12-03", content: "She photographs beautifully and her review was fair. Occupied table for nearly 3 hours during Sunday brunch rush, which was tough, but she ordered plenty and tipped well.", categories: { accuracy: 4, tipping: 4, politeness: 4, staffTreatment: 4, disclosed: true, reasonable: 4 }, flags: ["long-table-time"], helpful: 7, verified: true },
  { id: "review-008", reviewerId: "rev-004", restaurantId: "rest-004", rating: 4, date: "2024-01-28", content: "You can tell he knows food. Ordered strategically to test the kitchen. His review was harsh but accurate—he caught a sauce that was slightly broken. Fair, if intimidating.", categories: { accuracy: 5, tipping: 4, politeness: 3, staffTreatment: 3, disclosed: false, reasonable: 5 }, flags: [], helpful: 22, verified: true },
  { id: "review-009", reviewerId: "rev-004", restaurantId: "rest-006", rating: 3, date: "2023-10-11", content: "Former kitchen worker—he mentioned it. Very exacting, pointed out issues with plating that most wouldn't notice. Review was technical and honest. Not warm, but not unfair either.", categories: { accuracy: 5, tipping: 3, politeness: 3, staffTreatment: 3, disclosed: true, reasonable: 4 }, flags: [], helpful: 18, verified: true },
  { id: "review-010", reviewerId: "rev-005", restaurantId: "rest-001", rating: 1, date: "2023-12-20", content: "Asked if we 'do anything special for Yelpers.' When we said no, attitude shifted immediately. Complained about portion sizes (they're normal). Review mysteriously focused on 'value' issues.", categories: { accuracy: 2, tipping: 2, politeness: 2, staffTreatment: 2, disclosed: true, reasonable: 1 }, flags: ["solicited-freebies", "retaliatory-review"], helpful: 31, verified: true },
  { id: "review-011", reviewerId: "rev-005", restaurantId: "rest-005", rating: 2, date: "2024-02-05", content: "Mentioned her Yelp reviews three times. Asked for 'a little extra' in her burrito—which we gave. Still complained portions were small in her review. You can't win with this one.", categories: { accuracy: 2, tipping: 2, politeness: 3, staffTreatment: 3, disclosed: true, reasonable: 2 }, flags: ["solicited-freebies"], helpful: 14, verified: true },
  { id: "review-012", reviewerId: "rev-006", restaurantId: "rest-004", rating: 5, date: "2024-01-10", content: "An absolute pleasure. Old-school dining etiquette, genuinely interested in the food, asked thoughtful questions. Left 28% tip. His review was gracious even when noting minor issues. This is how it should be.", categories: { accuracy: 5, tipping: 5, politeness: 5, staffTreatment: 5, disclosed: false, reasonable: 5 }, flags: [], helpful: 45, verified: true },
  { id: "review-013", reviewerId: "rev-006", restaurantId: "rest-006", rating: 5, date: "2023-11-15", content: "A gentleman in every sense. Thanked each staff member by name. Even when his steak was slightly over, he was gracious about the remake. Rare to see this level of class. 25% tip.", categories: { accuracy: 5, tipping: 5, politeness: 5, staffTreatment: 5, disclosed: false, reasonable: 5 }, flags: [], helpful: 38, verified: true },
  { id: "review-014", reviewerId: "rev-006", restaurantId: "rest-001", rating: 5, date: "2023-08-22", content: "10-time Elite who acts nothing like it. Humble, appreciative, engaged with our sommelier beautifully. His review praised specific staff members. We sent him a thank you note.", categories: { accuracy: 5, tipping: 5, politeness: 5, staffTreatment: 5, disclosed: false, reasonable: 5 }, flags: [], helpful: 29, verified: true },
  { id: "review-015", reviewerId: "rev-007", restaurantId: "rest-003", rating: 3, date: "2024-01-05", content: "Asked detailed questions about every ingredient—which is fine, we accommodate allergies. But then lectured our server about factory farming for 10 minutes. Review was fair but wished we had 'more vegan options' at a BBQ joint.", categories: { accuracy: 3, tipping: 3, politeness: 2, staffTreatment: 2, disclosed: false, reasonable: 2 }, flags: ["lectured-staff"], helpful: 11, verified: true },
  { id: "review-016", reviewerId: "rev-007", restaurantId: "rest-002", rating: 3, date: "2023-10-28", content: "Grilled us on fish sourcing, which we could answer. Seemed satisfied but review dinged us for 'not being transparent enough about sustainability.' We literally have it on the menu.", categories: { accuracy: 2, tipping: 3, politeness: 3, staffTreatment: 3, disclosed: false, reasonable: 2 }, flags: [], helpful: 8, verified: true },
  { id: "review-017", reviewerId: "rev-008", restaurantId: "rest-001", rating: 5, date: "2024-02-13", content: "Valentine's dinner with his wife. Called ahead to arrange flowers at the table. Gracious, patient during the rush, thanked everyone. Left a glowing review that mentioned staff by name. More like him, please.", categories: { accuracy: 5, tipping: 5, politeness: 5, staffTreatment: 5, disclosed: false, reasonable: 5 }, flags: [], helpful: 21, verified: true },
  { id: "review-018", reviewerId: "rev-008", restaurantId: "rest-006", rating: 5, date: "2023-12-23", content: "Anniversary dinner. Genuinely nice couple. Small issue with the appetizer, handled it gracefully. Still left 5 stars and specifically mentioned how we fixed it. This is a reviewer who gets it.", categories: { accuracy: 5, tipping: 5, politeness: 5, staffTreatment: 5, disclosed: false, reasonable: 5 }, flags: [], helpful: 17, verified: true },
  { id: "review-019", reviewerId: "rev-009", restaurantId: "rest-001", rating: 1, date: "2024-01-30", content: "Asked to speak to manager before even ordering. Complained table was 'too close to kitchen' (it wasn't), then 'too drafty' at new table. Sent back wine twice. Left 1 star because server 'had an attitude'—server was in tears.", categories: { accuracy: 1, tipping: 1, politeness: 1, staffTreatment: 1, disclosed: false, reasonable: 1 }, flags: ["made-staff-cry", "unreasonable-demands", "manager-demanded"], helpful: 67, verified: true },
  { id: "review-020", reviewerId: "rev-009", restaurantId: "rest-005", rating: 1, date: "2023-11-12", content: "Demanded to know 'who's in charge' at a taco counter. We're a 6-person operation. Complained her carnitas 'didn't look like the picture' (we don't have pictures). Left 1 star review calling us 'unprofessional.'", categories: { accuracy: 1, tipping: 2, politeness: 1, staffTreatment: 1, disclosed: true, reasonable: 1 }, flags: ["manager-demanded", "unreasonable-demands"], helpful: 42, verified: true },
  { id: "review-021", reviewerId: "rev-009", restaurantId: "rest-006", rating: 1, date: "2024-02-09", content: "Third time she's been here, third time she's demanded a manager. This time it was because her water glass had a 'spot.' Review claims 'dirty restaurant'—we have an A health rating.", categories: { accuracy: 1, tipping: 1, politeness: 1, staffTreatment: 1, disclosed: false, reasonable: 1 }, flags: ["manager-demanded", "fabricated-claims", "repeat-offender"], helpful: 55, verified: true },
  { id: "review-022", reviewerId: "rev-010", restaurantId: "rest-002", rating: 4, date: "2023-12-18", content: "Didn't realize he was a reviewer until the review popped up. Quiet, unassuming dinner. Review was fair and accurate. No drama. This is honestly ideal—just wish we'd known so we could have answered questions.", categories: { accuracy: 5, tipping: 4, politeness: 4, staffTreatment: 4, disclosed: false, reasonable: 5 }, flags: [], helpful: 6, verified: true },
  { id: "review-023", reviewerId: "rev-011", restaurantId: "rest-001", rating: 2, date: "2024-02-07", content: "Showed up with ring light and tripod. Asked if meal would be comped 'for the exposure.' When we said no, she ordered one appetizer, photographed it for an hour, and left. Review called us 'not influencer friendly.'", categories: { accuracy: 2, tipping: 1, politeness: 2, staffTreatment: 3, disclosed: true, reasonable: 1 }, flags: ["demanded-comps", "minimal-order", "retaliatory-review"], helpful: 48, verified: true },
  { id: "review-024", reviewerId: "rev-011", restaurantId: "rest-002", rating: 2, date: "2023-09-05", content: "DM'd us asking for free omakase 'in exchange for exposure to 45K followers.' We politely declined. She came anyway, paid, and left 2 stars citing 'cold fish'—our fish is literally never cold.", categories: { accuracy: 1, tipping: 2, politeness: 2, staffTreatment: 3, disclosed: true, reasonable: 1 }, flags: ["demanded-comps", "retaliatory-review", "fabricated-claims"], helpful: 52, verified: true },
  { id: "review-025", reviewerId: "rev-012", restaurantId: "rest-003", rating: 4, date: "2024-01-18", content: "His review pointed out our fries were underseasoned. He was right. We adjusted the recipe. This is what good criticism looks like—specific, actionable, and fair. He even updated his review when he came back.", categories: { accuracy: 5, tipping: 4, politeness: 4, staffTreatment: 4, disclosed: false, reasonable: 5 }, flags: [], helpful: 23, verified: true },
  { id: "review-026", reviewerId: "rev-012", restaurantId: "rest-006", rating: 4, date: "2023-11-30", content: "Doesn't pull punches but isn't cruel. Noted that our service was slow—it was, we were understaffed. Didn't exaggerate or make it personal. Tipped fairly despite the wait. Respect.", categories: { accuracy: 5, tipping: 4, politeness: 4, staffTreatment: 4, disclosed: false, reasonable: 5 }, flags: [], helpful: 19, verified: true },
  { id: "review-027", reviewerId: "rev-013", restaurantId: "rest-004", rating: 2, date: "2024-02-03", content: "Complained that her napkin was folded incorrectly. Then that the butter was too cold. Then that the bread was too warm. Review was 800 words about minor imperfections in a $200 meal that was, by all accounts, excellent.", categories: { accuracy: 2, tipping: 3, politeness: 2, staffTreatment: 2, disclosed: false, reasonable: 1 }, flags: ["impossible-standards", "excessive-complaints"], helpful: 29, verified: true },
  { id: "review-028", reviewerId: "rev-013", restaurantId: "rest-001", rating: 2, date: "2023-10-22", content: "Found a complaint for every course. Pasta was 'slightly too al dente.' Wine was 'a touch too cold.' Review reads like a health inspection. She's not wrong about anything specifically, she just... finds things.", categories: { accuracy: 3, tipping: 3, politeness: 2, staffTreatment: 3, disclosed: false, reasonable: 2 }, flags: ["impossible-standards"], helpful: 21, verified: true },
  { id: "review-029", reviewerId: "rev-014", restaurantId: "rest-003", rating: 5, date: "2024-01-25", content: "Just a normal guy enjoying dinner. Polite, patient, tipped 20%. His review was 3 sentences: food was good, service was friendly, he'd come back. Sometimes simple is perfect.", categories: { accuracy: 5, tipping: 4, politeness: 5, staffTreatment: 5, disclosed: false, reasonable: 5 }, flags: [], helpful: 12, verified: true },
  { id: "review-030", reviewerId: "rev-015", restaurantId: "rest-001", rating: 5, date: "2024-02-11", content: "You can tell he's worked in kitchens. Patient during a rush, understanding when something took longer. Even complimented the line cook on his way out. His review mentioned technique and execution—stuff only industry people notice.", categories: { accuracy: 5, tipping: 5, politeness: 5, staffTreatment: 5, disclosed: true, reasonable: 5 }, flags: [], helpful: 35, verified: true },
  { id: "review-031", reviewerId: "rev-015", restaurantId: "rest-002", rating: 5, date: "2023-12-08", content: "10x Elite who treats staff like colleagues, not servants. Asked about knife techniques, fish sourcing. Review praised specific dishes with actual culinary knowledge. Left 25% and thanked the chef personally.", categories: { accuracy: 5, tipping: 5, politeness: 5, staffTreatment: 5, disclosed: true, reasonable: 5 }, flags: [], helpful: 31, verified: true },
  { id: "review-032", reviewerId: "rev-015", restaurantId: "rest-004", rating: 4, date: "2024-01-02", content: "Knows his stuff. Noticed our new sous chef's influence on the menu. His review mentioned one dish was 'uncharacteristically heavy-handed with salt'—and he was right, we'd changed suppliers. Invaluable feedback.", categories: { accuracy: 5, tipping: 5, politeness: 5, staffTreatment: 5, disclosed: true, reasonable: 5 }, flags: [], helpful: 27, verified: true },
  { id: "review-033", reviewerId: "rev-002", restaurantId: "rest-004", rating: 1, date: "2024-02-14", content: "Walked in without reservation on Valentine's Day, was told it would be a 90-minute wait. Threw a fit in the foyer. Review claims we 'refused service'—we offered the wait time. Classic HangryHank.", categories: { accuracy: 1, tipping: 1, politeness: 1, staffTreatment: 1, disclosed: false, reasonable: 1 }, flags: ["fabricated-claims", "caused-scene"], helpful: 44, verified: true },
  { id: "review-034", reviewerId: "rev-009", restaurantId: "rest-003", rating: 1, date: "2024-02-17", content: "Her fourth visit, fourth complaint to management. This time: music was too loud (it wasn't), then too quiet, then she didn't like the song. Asked for discount 'for the trouble.' We declined. Review incoming.", categories: { accuracy: 1, tipping: 1, politeness: 1, staffTreatment: 1, disclosed: true, reasonable: 1 }, flags: ["manager-demanded", "repeat-offender", "solicited-discount"], helpful: 38, verified: true },
  { id: "review-035", reviewerId: "rev-005", restaurantId: "rest-006", rating: 2, date: "2024-01-12", content: "Tried the 'I'm a top reviewer, anything you can do for us?' approach. When that didn't work, she mysteriously found her steak 'overcooked' (ordered medium, delivered medium). Adjusted her tip accordingly too.", categories: { accuracy: 2, tipping: 1, politeness: 2, staffTreatment: 3, disclosed: true, reasonable: 2 }, flags: ["solicited-freebies", "undertipped"], helpful: 26, verified: true }
];

export default async function handler(req, res) {
  // Only allow POST with a secret key for security
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { secret } = req.body;
  if (secret !== process.env.SEED_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    console.log('Starting database seed...');

    // Clear existing data (in correct order due to foreign keys)
    await prisma.review.deleteMany();
    await prisma.reviewer.deleteMany();
    await prisma.restaurant.deleteMany();
    await prisma.tagType.deleteMany();
    await prisma.flagType.deleteMany();

    console.log('Cleared existing data');

    // Insert restaurants
    await prisma.restaurant.createMany({
      data: restaurants
    });
    console.log(`Inserted ${restaurants.length} restaurants`);

    // Insert reviewers
    await prisma.reviewer.createMany({
      data: reviewers
    });
    console.log(`Inserted ${reviewers.length} reviewers`);

    // Insert reviews
    for (const r of reviews) {
      await prisma.review.create({
        data: {
          id: r.id,
          reviewerId: r.reviewerId,
          restaurantId: r.restaurantId,
          rating: r.rating,
          content: r.content,
          date: new Date(r.date),
          verified: r.verified,
          helpful: r.helpful,
          flags: r.flags,
          categories: r.categories
        }
      });
    }
    console.log(`Inserted ${reviews.length} reviews`);

    // Insert tag types
    await prisma.tagType.createMany({
      data: tagTypes
    });
    console.log(`Inserted ${tagTypes.length} tag types`);

    // Insert flag types
    await prisma.flagType.createMany({
      data: flagTypes
    });
    console.log(`Inserted ${flagTypes.length} flag types`);

    return res.status(200).json({
      success: true,
      message: 'Database seeded successfully',
      counts: {
        restaurants: restaurants.length,
        reviewers: reviewers.length,
        reviews: reviews.length,
        tagTypes: tagTypes.length,
        flagTypes: flagTypes.length
      }
    });
  } catch (error) {
    console.error('Seed error:', error);
    return res.status(500).json({ error: error.message });
  }
}
