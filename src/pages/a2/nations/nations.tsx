// # Nation list
//
// - List of nations (default \*)
// - Summary of stats
// - Copy ids
//   /admin command format_for_nations
//   /admin list multis
//   /admin list multis_land
//   /admin list_login_times
//   /alliance cost
//   /nation revenueSheet
//   /nation stats nationRanking
//   /alliance stats allianceNationsSheet
//   /sheets_ia ActivitySheet
//   /sheets_ia activity_date
//   /sheets_ia daychange
//   /sheets_ia declares_date
//   /sheets_ia deposits_date
//   /sheets_milcom MMRSheet
//   /sheets_milcom WarCostByAllianceSheet
//   /sheets_milcom combatantSheet
//   /sheets_milcom lootValueSheet
//   /sheets_milcom warSheet
//   /sheets_econ stockpileSheet
//
// /trade findProducer
//
// /war counter sheet
//
// ## Tier graphs
//
// TODO: Update the tier graphs to work solo
// /spy tierGraph
// /stats_tier attributeTierGraph#
// /stats_tier cityTierGraph
// /stats_tier metric_by_group
// /stats_tier mmrTierGraph
// /stats_tier nth_loot_by_score
// /stats_tier strengthTierGraph
//
// ## If matches guild id:
//
// - Audit:
//   /audit hasNotBoughtSpies
//   /audit run
//   /audit sheet
//   /spy sheet free_ops
//   /sheets_milcom IntelOpSheet
//   /sheets_milcom unit_buy_sheet
//
// - /channel permissions
//   -> Nation list banking
//   -> Nation list grants
//   -> Nation list escrow
//
// /sheets_milcom warchestSheet
//
// /mail command
// /mail send
// /mail web_login
//
// # Nation list banking
//
// - /deposits convertNegative
// - /bank deposit
// - /deposits add
//   /deposits interest
//   /deposits reset
//   /deposits sheet
//
// TODO: Link to escrow
//
// ## Nation list taxes
//
// /tax deposits
// /tax listBracketAuto
// /nation set taxinternal
//
// ## Nation list grants
//
// /grant build
// /grant city
// /grant consumption
// /grant cost
// /grant infra
// /grant land
// /grant mmr
// /grant project
// /grant unit
// /grant warchest
//
// if guild is set:
// -> Link to templates

import {useParams} from "react-router-dom";

export default function Nations() {
    const {nations} = useParams<{ nations: string }>();




}






































