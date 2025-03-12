// # Nation extends NationList
//
// Basic stats
//
// - View ingame
// - color links to color blocs pages (TODO color bloc component does this - from the formatter)
//   graphs for nations
//   Departures
//
// todo: Group actions (e.g. Audits, Banking)
// If matches guild alliance
//
// /nation TurnTimer
// /nation beigeTurns
// /nation canIBeige
// /nation departures
// /nation history gray_streak
// /nation history vm
// /nation list bans
// /nation list multi
// /nation list rebuy
// /nation loot
// /alliance cost
// /nation reroll
// /nation revenue
// /nation revenueSheet
// /nation score
// /nation slots - TODO: View projects page, which also shows cost of each project (with checkmarks for policies)
// /nation spies
// /nation unitHistory
// /project sheet
// /sheets_ia ActivitySheetFromId


// # Nation wars
//
// /nation wars
//
// # Nation trades
//
// -> Link to trade alerts
// -> Link to trade util page
// /nation stats inflows
// /nation moneyTrades
// TODO: Check trade utils page to see what is relevant here
//
// # Nation taxes
//
// /tax info
//
// # Nation balance
//
// /deposits check
// /bank deposit
// /bank records
// /deposits add
// /deposits convertNegative
// /deposits flows
// /deposits interest
// /deposits reset
// /deposits shift
// /deposits shiftFlow
//
// /escrow withdraw
// /escrow add
// /escrow set
//
// ## If offshore is setup
//
// /trade accept
//
// -> Nation list grants

import {CM} from "../../../utils/Command";
import {useParams} from "react-router-dom";

export default function Nation() {
    const {nation} = useParams<{ nation: string }>();

    const columns = CM.placeholders('DBNation')
        .array()
        .add({cmd: 'getname'})
        .add({cmd: 'getid'})
        .add({cmd: 'gettax_id'})
        .add({cmd: 'getdate'})
        .add({cmd: 'getalliancename'})
        .add({cmd: 'getalliance_id'})
        // TODO position
        .add({cmd: 'getposition'})
        .add({cmd: 'allianceseniorityms'})
        .add({cmd: 'getuserid'})
        .add({cmd: 'getuserdiscriminator'})
        .add({cmd: 'getuseragems'})
        .add({cmd: 'getavg_infra'})
        .add({cmd: 'getcities'})
        .add({cmd: 'getoff'})
        .add({cmd: 'getmaxoff'})
        .add({cmd: 'getdef'})
        .add({cmd: 'getscore'})
        .add({cmd: 'getdomesticpolicy'})
        .add({cmd: 'getdomesticpolicyabsoluteturn'})
        .add({cmd: 'getwarpolicy'})
        .add({cmd: 'getwarpolicyabsoluteturn'})
        .add({cmd: 'getcontinent'})
        .add({cmd: 'getcolor'})
        .add({cmd: 'getcolorabsoluteturn'})
        .add({cmd: 'lastactivems'})

        .add({cmd: 'getsoldiers'})
        .add({cmd: 'gettanks'})
        .add({cmd: 'getaircraft'})
        .add({cmd: 'getships'})
        .add({cmd: 'getremainingunitbuy', args: {'unit': 'soldier'}})
        .add({cmd: 'getremainingunitbuy', args: {'unit': 'tank'}})
        .add({cmd: 'getremainingunitbuy', args: {'unit': 'aircraft'}})
        .add({cmd: 'getremainingunitbuy', args: {'unit': 'ship'}})
        // TODO unit cap
        .add({cmd: 'getspies'})
        .add({cmd: 'getspycap'})
        .add({cmd: 'getmissiles'})
        .add({cmd: 'getnukes'})
        .add({cmd: 'getmmrbuildingdecimal'})
        // .add({cmd: 'getMMRUnitDecimal'})
        .add({cmd: 'getscore'})
        .add({cmd: 'revenue'})
        .add({cmd: 'getrevenueconverted'})
        .add({cmd: 'projectslots'})
        .add({cmd: 'getprojectbitmask'})
        .add({cmd: 'getbountysums'})
        .add({cmd: 'getlootrevenuetotal'})
        // .add({cmd: 'getlootrevenueconverted'}) // todo
        .build();
}