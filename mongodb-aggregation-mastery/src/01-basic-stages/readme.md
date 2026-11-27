Operator	Meaning	Example
$eq	Equal	{ amount: { $eq: 2500 } }
$ne	Not equal	{ amount: { $ne: 2500 } }
$gt	Greater than	{ amount: { $gt: 2000 } }
$gte	Greater than or equal	{ amount: { $gte: 2000 } }
$lt	Less than	{ amount: { $lt: 2000 } }
$lte	Less than or equal	{ amount: { $lte: 2000 } }
$in	Values mein se koi ek match	{ status: { $in: ["pending", "delivered"] } }
$nin	Values mein se koi bhi match na ho	{ status: { $nin: ["cancelled", "pending"] } }