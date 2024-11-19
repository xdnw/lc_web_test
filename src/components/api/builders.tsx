import {AbstractBuilder} from '@/components/api/endpoints.tsx';

class ConflictBuilder extends AbstractBuilder {
    constructor() {
        super();
        this.data.type = "Conflict";
    }

    getCol2List(): this {
        return this.set("getCol2List", true);
    }
    
    isParticipant(args: {alliance: string, }): this {
        return this.set("isParticipant", args);
    }
    getEndMS(): this {
        return this.set("getEndMS", true);
    }
    
    getStartMS(): this {
        return this.set("getStartMS", true);
    }
    
    getResource(args: {resources: string, resource: string, }): this {
        return this.set("getResource", args);
    }
    getUrl(): this {
        return this.set("getUrl", true);
    }
    
    getResourceValue(args: {resources: string, }): this {
        return this.set("getResourceValue", args);
    }
    getWiki(): this {
        return this.set("getWiki", true);
    }
    
    getEndTurn(): this {
        return this.set("getEndTurn", true);
    }
    
    getCategory(): this {
        return this.set("getCategory", true);
    }
    
    getStartTurn(): this {
        return this.set("getStartTurn", true);
    }
    
    getAllianceList(): this {
        return this.set("getAllianceList", true);
    }
    
    getTotalWars(): this {
        return this.set("getTotalWars", true);
    }
    
    getGuild(): this {
        return this.set("getGuild", true);
    }
    
    getDamageConverted(args: {isPrimary: string, }): this {
        return this.set("getDamageConverted", args);
    }
    getStatusDesc(): this {
        return this.set("getStatusDesc", true);
    }
    
    getId(): this {
        return this.set("getId", true);
    }
    
    getGuildId(): this {
        return this.set("getGuildId", true);
    }
    
    getName(): this {
        return this.set("getName", true);
    }
    
    getActiveWars(): this {
        return this.set("getActiveWars", true);
    }
    
    isDirty(): this {
        return this.set("isDirty", true);
    }
    
    getOrdinal(): this {
        return this.set("getOrdinal", true);
    }
    
    getCasusBelli(): this {
        return this.set("getCasusBelli", true);
    }
    
    getCol1List(): this {
        return this.set("getCol1List", true);
    }
    
    getSide(args: {alliance: string, }): this {
        return this.set("getSide", args);
    }
}


class DBTreasureBuilder extends AbstractBuilder {
    constructor() {
        super();
        this.data.type = "DBTreasure";
    }

    getDaysRemaining(): this {
        return this.set("getDaysRemaining", true);
    }
    
    getNation(): this {
        return this.set("getNation", true);
    }
    
    getColor(): this {
        return this.set("getColor", true);
    }
    
    getId(): this {
        return this.set("getId", true);
    }
    
    getResource(args: {resources: string, resource: string, }): this {
        return this.set("getResource", args);
    }
    getTimeUntilNextSpawn(): this {
        return this.set("getTimeUntilNextSpawn", true);
    }
    
    getNationsInRange(args: {maxNationScore: string, }): this {
        return this.set("getNationsInRange", args);
    }
    getBonus(): this {
        return this.set("getBonus", true);
    }
    
    getName(): this {
        return this.set("getName", true);
    }
    
    getContinent(): this {
        return this.set("getContinent", true);
    }
    
    getResourceValue(args: {resources: string, }): this {
        return this.set("getResourceValue", args);
    }
    getSpawnDate(): this {
        return this.set("getSpawnDate", true);
    }
    
    getNation_id(): this {
        return this.set("getNation_id", true);
    }
    
    getNumNationsInRange(): this {
        return this.set("getNumNationsInRange", true);
    }
    
}

type TreatyTypeMethods = {
    getName: boolean;
    getResourceValue: { resources: string };
    getStrength: boolean;
    isMandatoryDefensive: boolean;
    getColor: boolean;
    isOffensive: boolean;
    getResource: { resources: string, resource: string };
    isDefensive: boolean;
};

class Builder<T> {
    private data: Partial<T> = {};

    set<K extends keyof T>(key: K, value: T[K]): this {
        this.data[key] = value;
        return this;
    }

    build(): Partial<T> {
        return this.data;
    }
}

class TreatyTypeBuilder extends AbstractBuilder {
    constructor() {
        super();
        this.data.type = "TreatyType";
    }

    getName(): this {
        return this.set("getName", true);
    }
    
    getResourceValue(args: {resources: string, }): this {
        return this.set("getResourceValue", args);
    }
    getStrength(): this {
        return this.set("getStrength", true);
    }
    
    isMandatoryDefensive(): this {
        return this.set("isMandatoryDefensive", true);
    }
    
    getColor(): this {
        return this.set("getColor", true);
    }
    
    isOffensive(): this {
        return this.set("isOffensive", true);
    }
    
    getResource(args: {resources: string, resource: string, }): this {
        return this.set("getResource", args);
    }
    isDefensive(): this {
        return this.set("isDefensive", true);
    }
    
}


class DBNationBuilder extends AbstractBuilder {
    constructor() {
        super();
        this.data.type = "DBNation";
    }

    getTradeAvgPpu(args: {dateStart: string, dateEnd?: string, types?: string, filter?: string, }): this {
        return this.set("getTradeAvgPpu", args);
    }
    getDefending(args: {nations: string, }): this {
        return this.set("getDefending", args);
    }
    lastSelfWithdrawal(): this {
        return this.set("lastSelfWithdrawal", true);
    }
    
    getSoldierPct(): this {
        return this.set("getSoldierPct", true);
    }
    
    isVerified(): this {
        return this.set("isVerified", true);
    }
    
    getCityAvg(args: {attribute: string, }): this {
        return this.set("getCityAvg", args);
    }
    getTradeValue(args: {dateStart: string, dateEnd?: string, types?: string, filter?: string, }): this {
        return this.set("getTradeValue", args);
    }
    infraDefendModifier(args: {type: string, }): this {
        return this.set("infraDefendModifier", args);
    }
    getTreasureBonusPct(): this {
        return this.set("getTreasureBonusPct", true);
    }
    
    getAllianceUrl(): this {
        return this.set("getAllianceUrl", true);
    }
    
    getScore(): this {
        return this.set("getScore", true);
    }
    
    isInWarRange(): this {
        return this.set("isInWarRange", true);
    }
    
    avg_daily_login_week(): this {
        return this.set("avg_daily_login_week", true);
    }
    
    isBlitzkrieg(): this {
        return this.set("isBlitzkrieg", true);
    }
    
    getProjectTurns(): this {
        return this.set("getProjectTurns", true);
    }
    
    isAllianceColor(): this {
        return this.set("isAllianceColor", true);
    }
    
    getBuyLandCost(args: {toLand: string, forceRAPolicy?: string, forceAEC?: string, forceALA?: string, forceGSA?: string, forceBDA?: string, }): this {
        return this.set("getBuyLandCost", args);
    }
    getColorAbsoluteTurn(): this {
        return this.set("getColorAbsoluteTurn", true);
    }
    
    daysSince6ConsecutiveLogins(): this {
        return this.set("daysSince6ConsecutiveLogins", true);
    }
    
    maxCityInfra(): this {
        return this.set("maxCityInfra", true);
    }
    
    getMMR(): this {
        return this.set("getMMR", true);
    }
    
    getTax_id(): this {
        return this.set("getTax_id", true);
    }
    
    hasBoughtAircraftToday(): this {
        return this.set("hasBoughtAircraftToday", true);
    }
    
    getAlliance(): this {
        return this.set("getAlliance", true);
    }
    
    isInSpyRange(args: {other: string, }): this {
        return this.set("isInSpyRange", args);
    }
    hasWarBounty(): this {
        return this.set("hasWarBounty", true);
    }
    
    getEspionageFullTurn(): this {
        return this.set("getEspionageFullTurn", true);
    }
    
    lootTotal(): this {
        return this.set("lootTotal", true);
    }
    
    hasBoughtNukeToday(): this {
        return this.set("hasBoughtNukeToday", true);
    }
    
    hasProject(args: {project: string, }): this {
        return this.set("hasProject", args);
    }
    correctAllianceMMR(): this {
        return this.set("correctAllianceMMR", true);
    }
    
    getUnitsAt(args: {unit: string, date: string, }): this {
        return this.set("getUnitsAt", args);
    }
    inactivity_streak(args: {daysInactive: string, checkPastXDays: string, }): this {
        return this.set("inactivity_streak", args);
    }
    getEnemyStrength(): this {
        return this.set("getEnemyStrength", true);
    }
    
    infraValue(): this {
        return this.set("infraValue", true);
    }
    
    lostInactiveWar(): this {
        return this.set("lostInactiveWar", true);
    }
    
    daysSince7ConsecutiveLogins(): this {
        return this.set("daysSince7ConsecutiveLogins", true);
    }
    
    getAllTimeOffensiveWars(): this {
        return this.set("getAllTimeOffensiveWars", true);
    }
    
    getInfra(): this {
        return this.set("getInfra", true);
    }
    
    getLeader(): this {
        return this.set("getLeader", true);
    }
    
    isEspionageFull(): this {
        return this.set("isEspionageFull", true);
    }
    
    getBountySums(): this {
        return this.set("getBountySums", true);
    }
    
    getNations(): this {
        return this.set("getNations", true);
    }
    
    getSpyReportsToday(): this {
        return this.set("getSpyReportsToday", true);
    }
    
    getAuditResultString(args: {audit: string, }): this {
        return this.set("getAuditResultString", args);
    }
    hasBoughtSpiesToday(): this {
        return this.set("hasBoughtSpiesToday", true);
    }
    
    hasBoughtSoldiersToday(): this {
        return this.set("hasBoughtSoldiersToday", true);
    }
    
    getLastUnitBuy(args: {unit: string, }): this {
        return this.set("getLastUnitBuy", args);
    }
    getUserDiscriminator(): this {
        return this.set("getUserDiscriminator", true);
    }
    
    getShipPct(): this {
        return this.set("getShipPct", true);
    }
    
    getBlockading(): this {
        return this.set("getBlockading", true);
    }
    
    getCityCostPerCitySince(args: {time: string, allowProjects: string, }): this {
        return this.set("getCityCostPerCitySince", args);
    }
    login_daychange(): this {
        return this.set("login_daychange", true);
    }
    
    getCities(): this {
        return this.set("getCities", true);
    }
    
    canBuildProject(args: {project: string, }): this {
        return this.set("canBuildProject", args);
    }
    maxBountyValue(): this {
        return this.set("maxBountyValue", true);
    }
    
    getActiveWarsWith(args: {filter: string, }): this {
        return this.set("getActiveWarsWith", args);
    }
    hasPermission(args: {permission: string, }): this {
        return this.set("hasPermission", args);
    }
    hasUnitBuyToday(args: {unit: string, }): this {
        return this.set("hasUnitBuyToday", args);
    }
    avg_daily_login(): this {
        return this.set("avg_daily_login", true);
    }
    
    isFightingEnemyOfScore(args: {minScore: string, maxScore: string, }): this {
        return this.set("isFightingEnemyOfScore", args);
    }
    getCitiesSince(args: {time: string, }): this {
        return this.set("getCitiesSince", args);
    }
    getStrongestEnemy(): this {
        return this.set("getStrongestEnemy", true);
    }
    
    getMMRBuildingDecimal(): this {
        return this.set("getMMRBuildingDecimal", true);
    }
    
    daysSinceLastSpyBuy(): this {
        return this.set("daysSinceLastSpyBuy", true);
    }
    
    getAgeDays(): this {
        return this.set("getAgeDays", true);
    }
    
    daysSinceLastWar(): this {
        return this.set("daysSinceLastWar", true);
    }
    
    daysSince3ConsecutiveLogins(): this {
        return this.set("daysSince3ConsecutiveLogins", true);
    }
    
    getAircraft(): this {
        return this.set("getAircraft", true);
    }
    
    getColorTurns(): this {
        return this.set("getColorTurns", true);
    }
    
    getEntered_vm(): this {
        return this.set("getEntered_vm", true);
    }
    
    getMoneyLooted(): this {
        return this.set("getMoneyLooted", true);
    }
    
    getBeigeAbsoluteTurn(): this {
        return this.set("getBeigeAbsoluteTurn", true);
    }
    
    hasTreasure(): this {
        return this.set("hasTreasure", true);
    }
    
    canBeDeclaredOnByScore(args: {score: string, }): this {
        return this.set("canBeDeclaredOnByScore", args);
    }
    getStrongestEnemyRelative(): this {
        return this.set("getStrongestEnemyRelative", true);
    }
    
    getBeigeLootTotal(): this {
        return this.set("getBeigeLootTotal", true);
    }
    
    getAvgLand(): this {
        return this.set("getAvgLand", true);
    }
    
    getUpdateTZ(): this {
        return this.set("getUpdateTZ", true);
    }
    
    getAvgDrydocks(): this {
        return this.set("getAvgDrydocks", true);
    }
    
    getAllianceDepositValue(): this {
        return this.set("getAllianceDepositValue", true);
    }
    
    getWarPolicyAbsoluteTurn(): this {
        return this.set("getWarPolicyAbsoluteTurn", true);
    }
    
    isBeige(): this {
        return this.set("isBeige", true);
    }
    
    countWars(args: {warFilter: string, }): this {
        return this.set("countWars", args);
    }
    getOnlineStatus(): this {
        return this.set("getOnlineStatus", true);
    }
    
    daysSinceLastBankDeposit(): this {
        return this.set("daysSinceLastBankDeposit", true);
    }
    
    nukeBountyValue(): this {
        return this.set("nukeBountyValue", true);
    }
    
    daysSinceLastShipBuy(): this {
        return this.set("daysSinceLastShipBuy", true);
    }
    
    getDc_turn(): this {
        return this.set("getDc_turn", true);
    }
    
    getGNI(): this {
        return this.set("getGNI", true);
    }
    
    projectValue(): this {
        return this.set("projectValue", true);
    }
    
    getShips(): this {
        return this.set("getShips", true);
    }
    
    getRads(): this {
        return this.set("getRads", true);
    }
    
    getAvgHangars(): this {
        return this.set("getAvgHangars", true);
    }
    
    isFightingActive(): this {
        return this.set("isFightingActive", true);
    }
    
    getResource(args: {resources: string, resource: string, }): this {
        return this.set("getResource", args);
    }
    avg_daily_login_turns(): this {
        return this.set("avg_daily_login_turns", true);
    }
    
    getDeposits(args: {start?: string, end?: string, filter?: string, ignoreBaseTaxrate?: string, ignoreOffsets?: string, includeExpired?: string, includeIgnored?: string, excludeTypes?: string, }): this {
        return this.set("getDeposits", args);
    }
    getDomesticPolicy(): this {
        return this.set("getDomesticPolicy", true);
    }
    
    infraAttackModifier(args: {type: string, }): this {
        return this.set("infraAttackModifier", args);
    }
    hasBounty(): this {
        return this.set("hasBounty", true);
    }
    
    getUnits(args: {unit: string, }): this {
        return this.set("getUnits", args);
    }
    getProjectBitMask(): this {
        return this.set("getProjectBitMask", true);
    }
    
    isBlockader(): this {
        return this.set("isBlockader", true);
    }
    
    isPowered(): this {
        return this.set("isPowered", true);
    }
    
    isFightingEnemyOfCities(args: {minCities: string, maxCities: string, }): this {
        return this.set("isFightingEnemyOfCities", args);
    }
    getAvgBarracks(): this {
        return this.set("getAvgBarracks", true);
    }
    
    hasProjects(args: {projects: string, any?: string, }): this {
        return this.set("hasProjects", args);
    }
    isDefendingEnemyOfCities(args: {minCities: string, maxCities: string, }): this {
        return this.set("isDefendingEnemyOfCities", args);
    }
    getNation(): this {
        return this.set("getNation", true);
    }
    
    getPosition(): this {
        return this.set("getPosition", true);
    }
    
    isEnemy(): this {
        return this.set("isEnemy", true);
    }
    
    getContinent(): this {
        return this.set("getContinent", true);
    }
    
    allianceSeniorityApplicant(): this {
        return this.set("allianceSeniorityApplicant", true);
    }
    
    getEnemies(): this {
        return this.set("getEnemies", true);
    }
    
    getFighting(args: {nations: string, }): this {
        return this.set("getFighting", args);
    }
    allianceSeniority(): this {
        return this.set("allianceSeniority", true);
    }
    
    hasBoughtShipsToday(): this {
        return this.set("hasBoughtShipsToday", true);
    }
    
    isBlockaded(): this {
        return this.set("isBlockaded", true);
    }
    
    cityUrl(args: {index: string, }): this {
        return this.set("cityUrl", args);
    }
    getAvgBuildings(args: {buildings?: string, }): this {
        return this.set("getAvgBuildings", args);
    }
    getCitiesAt(args: {time: string, }): this {
        return this.set("getCitiesAt", args);
    }
    equilibriumTaxRate(): this {
        return this.set("equilibriumTaxRate", true);
    }
    
    getTotalLand(): this {
        return this.set("getTotalLand", true);
    }
    
    isEspionageAvailable(): this {
        return this.set("isEspionageAvailable", true);
    }
    
    daysSince4ConsecutiveLogins(): this {
        return this.set("daysSince4ConsecutiveLogins", true);
    }
    
    ordinaryBountyValue(): this {
        return this.set("ordinaryBountyValue", true);
    }
    
    landValue(): this {
        return this.set("landValue", true);
    }
    
    getTankPct(): this {
        return this.set("getTankPct", true);
    }
    
    lastBankDeposit(): this {
        return this.set("lastBankDeposit", true);
    }
    
    isInAllianceGuild(): this {
        return this.set("isInAllianceGuild", true);
    }
    
    canSpyOnScore(args: {score: string, }): this {
        return this.set("canSpyOnScore", args);
    }
    isAttackingEnemyOfCities(args: {minCities: string, maxCities: string, }): this {
        return this.set("isAttackingEnemyOfCities", args);
    }
    maxWarBountyValue(): this {
        return this.set("maxWarBountyValue", true);
    }
    
    getNumDefWarsSince(args: {date: string, }): this {
        return this.set("getNumDefWarsSince", args);
    }
    getCityTotal(args: {attribute: string, }): this {
        return this.set("getCityTotal", args);
    }
    raidBountyValue(): this {
        return this.set("raidBountyValue", true);
    }
    
    getGroundStrength(args: {munitions: string, enemyAc: string, includeRebuy?: string, }): this {
        return this.set("getGroundStrength", args);
    }
    getMaxOff(): this {
        return this.set("getMaxOff", true);
    }
    
    getDomesticPolicyAbsoluteTurn(): this {
        return this.set("getDomesticPolicyAbsoluteTurn", true);
    }
    
    getUserId(): this {
        return this.set("getUserId", true);
    }
    
    minWarResistancePlusMap(): this {
        return this.set("minWarResistancePlusMap", true);
    }
    
    getCityGroup(args: {ranges: string, }): this {
        return this.set("getCityGroup", args);
    }
    daysSinceConsecutiveLogins(args: {checkPastXDays: string, sequentialDays: string, }): this {
        return this.set("daysSinceConsecutiveLogins", args);
    }
    getFreeOffSpyOps(): this {
        return this.set("getFreeOffSpyOps", true);
    }
    
    daysSinceLastTankBuy(): this {
        return this.set("daysSinceLastTankBuy", true);
    }
    
    getDiscordUser(): this {
        return this.set("getDiscordUser", true);
    }
    
    getBuildings(args: {buildings?: string, }): this {
        return this.set("getBuildings", args);
    }
    getUserAgeMs(): this {
        return this.set("getUserAgeMs", true);
    }
    
    getId(): this {
        return this.set("getId", true);
    }
    
    getBuyInfraCost(args: {toInfra: string, forceUrbanization?: string, forceAEC?: string, forceCFCE?: string, forceGSA?: string, forceBDA?: string, }): this {
        return this.set("getBuyInfraCost", args);
    }
    getSpies(): this {
        return this.set("getSpies", true);
    }
    
    getNumReports(): this {
        return this.set("getNumReports", true);
    }
    
    getStockpile(): this {
        return this.set("getStockpile", true);
    }
    
    getStrongestOffEnemyOfScore(args: {minScore: string, maxScore: string, }): this {
        return this.set("getStrongestOffEnemyOfScore", args);
    }
    getNumProjects(): this {
        return this.set("getNumProjects", true);
    }
    
    getPositionEnum(): this {
        return this.set("getPositionEnum", true);
    }
    
    getNukes(): this {
        return this.set("getNukes", true);
    }
    
    lootModifier(): this {
        return this.set("lootModifier", true);
    }
    
    isGray(): this {
        return this.set("isGray", true);
    }
    
    getSpyCap(): this {
        return this.set("getSpyCap", true);
    }
    
    getFreeOffensiveSlots(): this {
        return this.set("getFreeOffensiveSlots", true);
    }
    
    getCityTurns(): this {
        return this.set("getCityTurns", true);
    }
    
    getAvgBuilding(args: {building: string, }): this {
        return this.set("getAvgBuilding", args);
    }
    city(args: {index: string, }): this {
        return this.set("city", args);
    }
    daysSinceLastAircraftBuy(): this {
        return this.set("daysSinceLastAircraftBuy", true);
    }
    
    getAllianceDepositValuePerCity(): this {
        return this.set("getAllianceDepositValuePerCity", true);
    }
    
    getFreeProjectSlots(): this {
        return this.set("getFreeProjectSlots", true);
    }
    
    getAllTimeWars(): this {
        return this.set("getAllTimeWars", true);
    }
    
    getStrength(): this {
        return this.set("getStrength", true);
    }
    
    getOffSpySlots(): this {
        return this.set("getOffSpySlots", true);
    }
    
    daysSinceLastSoldierBuy(): this {
        return this.set("daysSinceLastSoldierBuy", true);
    }
    
    getAircraftPct(): this {
        return this.set("getAircraftPct", true);
    }
    
    daysSinceLastNukeBuy(): this {
        return this.set("daysSinceLastNukeBuy", true);
    }
    
    getDomesticPolicyTurns(): this {
        return this.set("getDomesticPolicyTurns", true);
    }
    
    hasAnyPermission(args: {permissions: string, }): this {
        return this.set("hasAnyPermission", args);
    }
    getNumOffWarsSince(args: {date: string, }): this {
        return this.set("getNumOffWarsSince", args);
    }
    treasureDays(): this {
        return this.set("treasureDays", true);
    }
    
    isAttackingEnemyOfScore(args: {minScore: string, maxScore: string, }): this {
        return this.set("isAttackingEnemyOfScore", args);
    }
    canBeSpiedByScore(args: {score: string, }): this {
        return this.set("canBeSpiedByScore", args);
    }
    allianceSeniorityNoneMs(): this {
        return this.set("allianceSeniorityNoneMs", true);
    }
    
    getUserAgeDays(): this {
        return this.set("getUserAgeDays", true);
    }
    
    getCityMax(args: {attribute: string, }): this {
        return this.set("getCityMax", args);
    }
    getDef(): this {
        return this.set("getDef", true);
    }
    
    getTurnsFromDC(): this {
        return this.set("getTurnsFromDC", true);
    }
    
    getAllianceName(): this {
        return this.set("getAllianceName", true);
    }
    
    daysSinceLastOffensive(): this {
        return this.set("daysSinceLastOffensive", true);
    }
    
    getAttacking(args: {nations: string, }): this {
        return this.set("getAttacking", args);
    }
    getAllTimeOffDefWars(): this {
        return this.set("getAllTimeOffDefWars", true);
    }
    
    getFreeBuildings(): this {
        return this.set("getFreeBuildings", true);
    }
    
    hasBoughtTanksToday(): this {
        return this.set("hasBoughtTanksToday", true);
    }
    
    getName(): this {
        return this.set("getName", true);
    }
    
    getMissiles(): this {
        return this.set("getMissiles", true);
    }
    
    getCityCostSince(args: {time: string, allowProjects: string, }): this {
        return this.set("getCityCostSince", args);
    }
    getUserMention(): this {
        return this.set("getUserMention", true);
    }
    
    getBeigeTurns(): this {
        return this.set("getBeigeTurns", true);
    }
    
    hasUnsetMil(): this {
        return this.set("hasUnsetMil", true);
    }
    
    getDaysSinceLastCity(): this {
        return this.set("getDaysSinceLastCity", true);
    }
    
    getDaysSinceLastSpyReport(): this {
        return this.set("getDaysSinceLastSpyReport", true);
    }
    
    cellLookup(args: {sheet: string, tabName: string, columnSearch: string, columnOutput: string, search: string, }): this {
        return this.set("cellLookup", args);
    }
    getSoldiers(): this {
        return this.set("getSoldiers", true);
    }
    
    getActive_m(args: {time?: string, }): this {
        return this.set("getActive_m", args);
    }
    minWarResistance(): this {
        return this.set("minWarResistance", true);
    }
    
    getNetDepositsConverted(): this {
        return this.set("getNetDepositsConverted", true);
    }
    
    daysSinceLastMissileBuy(): this {
        return this.set("daysSinceLastMissileBuy", true);
    }
    
    getDate(): this {
        return this.set("getDate", true);
    }
    
    daysSinceLastDefensiveWarLoss(): this {
        return this.set("daysSinceLastDefensiveWarLoss", true);
    }
    
    getWars_lost(): this {
        return this.set("getWars_lost", true);
    }
    
    getStrongestEnemyOfScore(args: {minScore: string, maxScore: string, }): this {
        return this.set("getStrongestEnemyOfScore", args);
    }
    estimateGNI(): this {
        return this.set("estimateGNI", true);
    }
    
    isOnline(): this {
        return this.set("isOnline", true);
    }
    
    allianceSeniorityMs(): this {
        return this.set("allianceSeniorityMs", true);
    }
    
    revenue(args: {turns?: string, no_cities?: string, no_military?: string, no_trade_bonus?: string, no_new_bonus?: string, no_food?: string, no_power?: string, treasure_bonus?: string, }): this {
        return this.set("revenue", args);
    }
    getWarPolicy(): this {
        return this.set("getWarPolicy", true);
    }
    
    getCityMin(args: {attribute: string, }): this {
        return this.set("getCityMin", args);
    }
    isBanEvading(): this {
        return this.set("isBanEvading", true);
    }
    
    getPositionLevel(): this {
        return this.set("getPositionLevel", true);
    }
    
    getCityTimerAbsoluteTurn(): this {
        return this.set("getCityTimerAbsoluteTurn", true);
    }
    
    getNumWars(): this {
        return this.set("getNumWars", true);
    }
    
    hasPriorBan(): this {
        return this.set("hasPriorBan", true);
    }
    
    getVacationTurnsElapsed(): this {
        return this.set("getVacationTurnsElapsed", true);
    }
    
    getTradeQuantity(args: {dateStart: string, dateEnd?: string, types?: string, filter?: string, net?: string, }): this {
        return this.set("getTradeQuantity", args);
    }
    maxCityLand(): this {
        return this.set("maxCityLand", true);
    }
    
    allianceSeniorityApplicantMs(): this {
        return this.set("allianceSeniorityApplicantMs", true);
    }
    
    getProjects(): this {
        return this.set("getProjects", true);
    }
    
    cityValue(): this {
        return this.set("cityValue", true);
    }
    
    projectSlots(): this {
        return this.set("projectSlots", true);
    }
    
    getNumWarsAgainstActives(): this {
        return this.set("getNumWarsAgainstActives", true);
    }
    
    buildingValue(): this {
        return this.set("buildingValue", true);
    }
    
    getNumWarsSince(args: {date: string, }): this {
        return this.set("getNumWarsSince", args);
    }
    getBlockadedBy(): this {
        return this.set("getBlockadedBy", true);
    }
    
    getAvgFactories(): this {
        return this.set("getAvgFactories", true);
    }
    
    getLeaving_vm(): this {
        return this.set("getLeaving_vm", true);
    }
    
    isTaxable(): this {
        return this.set("isTaxable", true);
    }
    
    getProjectAbsoluteTurn(): this {
        return this.set("getProjectAbsoluteTurn", true);
    }
    
    getLootRevenueTotal(): this {
        return this.set("getLootRevenueTotal", true);
    }
    
    getTanks(): this {
        return this.set("getTanks", true);
    }
    
    getSpyCapLeft(): this {
        return this.set("getSpyCapLeft", true);
    }
    
    getTurnsTillDC(): this {
        return this.set("getTurnsTillDC", true);
    }
    
    militaryValue(): this {
        return this.set("militaryValue", true);
    }
    
    canDeclareOnScore(args: {score: string, }): this {
        return this.set("canDeclareOnScore", args);
    }
    getColor(): this {
        return this.set("getColor", true);
    }
    
    getWars_won(): this {
        return this.set("getWars_won", true);
    }
    
    getAllianceRank(args: {filter?: string, }): this {
        return this.set("getAllianceRank", args);
    }
    daysSinceLastSelfWithdrawal(): this {
        return this.set("daysSinceLastSelfWithdrawal", true);
    }
    
    getRevenueConverted(): this {
        return this.set("getRevenueConverted", true);
    }
    
    isReroll(): this {
        return this.set("isReroll", true);
    }
    
    getUrl(): this {
        return this.set("getUrl", true);
    }
    
    getOff(): this {
        return this.set("getOff", true);
    }
    
    getResourceValue(args: {resources: string, }): this {
        return this.set("getResourceValue", args);
    }
    getAlliance_id(): this {
        return this.set("getAlliance_id", true);
    }
    
    getRelativeStrength(): this {
        return this.set("getRelativeStrength", true);
    }
    
    getAllTimeDefensiveWars(): this {
        return this.set("getAllTimeDefensiveWars", true);
    }
    
    totalBountyValue(): this {
        return this.set("totalBountyValue", true);
    }
    
    passesAudit(args: {audit: string, }): this {
        return this.set("passesAudit", args);
    }
    getStrengthMMR(args: {mmr: string, }): this {
        return this.set("getStrengthMMR", args);
    }
    getAvg_infra(): this {
        return this.set("getAvg_infra", true);
    }
    
    getVm_turns(): this {
        return this.set("getVm_turns", true);
    }
    
    hasBoughtMissileToday(): this {
        return this.set("hasBoughtMissileToday", true);
    }
    
    looterModifier(args: {isGround: string, }): this {
        return this.set("looterModifier", args);
    }
    isInMilcomGuild(): this {
        return this.set("isInMilcomGuild", true);
    }
    
    hasAllPermission(args: {permissions: string, }): this {
        return this.set("hasAllPermission", args);
    }
    getRevenuePerCityConverted(): this {
        return this.set("getRevenuePerCityConverted", true);
    }
    
    getMMRBuildingStr(): this {
        return this.set("getMMRBuildingStr", true);
    }
    
    getPopulation(): this {
        return this.set("getPopulation", true);
    }
    
    attritionBountyValue(): this {
        return this.set("attritionBountyValue", true);
    }
    
    getAlliancePositionId(): this {
        return this.set("getAlliancePositionId", true);
    }
    
    getNation_id(): this {
        return this.set("getNation_id", true);
    }
    
    getWarPolicyTurns(): this {
        return this.set("getWarPolicyTurns", true);
    }
    
    hasNukeBounty(): this {
        return this.set("hasNukeBounty", true);
    }
    
    daysSince5ConsecutiveLogins(): this {
        return this.set("daysSince5ConsecutiveLogins", true);
    }
    
    getAuditResult(args: {audit: string, }): this {
        return this.set("getAuditResult", args);
    }
    isIn(args: {nations: string, }): this {
        return this.set("isIn", args);
    }
}


class NationListBuilder extends AbstractBuilder {
    constructor() {
        super();
        this.data.type = "NationList";
    }

    getResourceValue(args: {resources: string, }): this {
        return this.set("getResourceValue", args);
    }
    getResource(args: {resources: string, resource: string, }): this {
        return this.set("getResource", args);
    }
}


class BuildingBuilder extends AbstractBuilder {
    constructor() {
        super();
        this.data.type = "Building";
    }

    getRequiredCitizens(): this {
        return this.set("getRequiredCitizens", true);
    }
    
    getBaseProduction(): this {
        return this.set("getBaseProduction", true);
    }
    
    nameSnakeCase(): this {
        return this.set("nameSnakeCase", true);
    }
    
    getUpkeep(args: {type: string, hasProject?: string, }): this {
        return this.set("getUpkeep", args);
    }
    getType(): this {
        return this.set("getType", true);
    }
    
    countCanBuild(args: {nations: string, }): this {
        return this.set("countCanBuild", args);
    }
    getCostMap(): this {
        return this.set("getCostMap", true);
    }
    
    getResourceProduced(): this {
        return this.set("getResourceProduced", true);
    }
    
    getResource(args: {resources: string, resource: string, }): this {
        return this.set("getResource", args);
    }
    getResourceValue(args: {resources: string, }): this {
        return this.set("getResourceValue", args);
    }
    getMarketCost(): this {
        return this.set("getMarketCost", true);
    }
    
    getContinents(): this {
        return this.set("getContinents", true);
    }
    
    getTotal(args: {nations: string, }): this {
        return this.set("getTotal", args);
    }
    getInfraBase(): this {
        return this.set("getInfraBase", true);
    }
    
    getUnitDailyBuy(): this {
        return this.set("getUnitDailyBuy", true);
    }
    
    getInfraMax(): this {
        return this.set("getInfraMax", true);
    }
    
    cost(args: {type: string, }): this {
        return this.set("cost", args);
    }
    getCommerce(): this {
        return this.set("getCommerce", true);
    }
    
    getNMarketCost(args: {num: string, }): this {
        return this.set("getNMarketCost", args);
    }
    getPowerResourceConsumed(args: {infra: string, }): this {
        return this.set("getPowerResourceConsumed", args);
    }
    getCap(args: {hasProject?: string, }): this {
        return this.set("getCap", args);
    }
    getPollution(args: {hasProject?: string, }): this {
        return this.set("getPollution", args);
    }
    getMilitaryUnit(): this {
        return this.set("getMilitaryUnit", true);
    }
    
    getPowerResource(): this {
        return this.set("getPowerResource", true);
    }
    
    getAverage(args: {nations: string, }): this {
        return this.set("getAverage", args);
    }
    getUnitCap(): this {
        return this.set("getUnitCap", true);
    }
    
    name(): this {
        return this.set("name", true);
    }
    
    getUpkeepMap(args: {hasProject?: string, }): this {
        return this.set("getUpkeepMap", args);
    }
    getResourceTypesConsumed(): this {
        return this.set("getResourceTypesConsumed", true);
    }
    
    canBuild(args: {continent: string, }): this {
        return this.set("canBuild", args);
    }
    ordinal(): this {
        return this.set("ordinal", true);
    }
    
}


class AuditTypeBuilder extends AbstractBuilder {
    constructor() {
        super();
        this.data.type = "AuditType";
    }

    getName(): this {
        return this.set("getName", true);
    }
    
    getResourceValue(args: {resources: string, }): this {
        return this.set("getResourceValue", args);
    }
    getEmoji(): this {
        return this.set("getEmoji", true);
    }
    
    getRequired(): this {
        return this.set("getRequired", true);
    }
    
    getResource(args: {resources: string, resource: string, }): this {
        return this.set("getResource", args);
    }
    getSeverity(): this {
        return this.set("getSeverity", true);
    }
    
}


class IAttackBuilder extends AbstractBuilder {
    constructor() {
        super();
        this.data.type = "IAttack";
    }

    getResourceValue(args: {resources: string, }): this {
        return this.set("getResourceValue", args);
    }
    getResource(args: {resources: string, resource: string, }): this {
        return this.set("getResource", args);
    }
}


class DBTradeBuilder extends AbstractBuilder {
    constructor() {
        super();
        this.data.type = "DBTrade";
    }

    isBuy(): this {
        return this.set("isBuy", true);
    }
    
    getBuyer(): this {
        return this.set("getBuyer", true);
    }
    
    getSeller(): this {
        return this.set("getSeller", true);
    }
    
    getType(): this {
        return this.set("getType", true);
    }
    
    getBuyerNation(): this {
        return this.set("getBuyerNation", true);
    }
    
    getDate(): this {
        return this.set("getDate", true);
    }
    
    getQuantity(): this {
        return this.set("getQuantity", true);
    }
    
    getResource(): this {
        return this.set("getResource", true);
    }
    
    getDate_accepted(): this {
        return this.set("getDate_accepted", true);
    }
    
    getResourceValue(args: {resources: string, }): this {
        return this.set("getResourceValue", args);
    }
    getSellerNation(): this {
        return this.set("getSellerNation", true);
    }
    
    getPpu(): this {
        return this.set("getPpu", true);
    }
    
    getParent_id(): this {
        return this.set("getParent_id", true);
    }
    
    getTradeId(): this {
        return this.set("getTradeId", true);
    }
    
}


class GuildSettingBuilder extends AbstractBuilder {
    constructor() {
        super();
        this.data.type = "GuildSetting";
    }

    getTypeName(): this {
        return this.set("getTypeName", true);
    }
    
    isChannelType(): this {
        return this.set("isChannelType", true);
    }
    
    hasInvalidValue(args: {checkDelegate?: string, }): this {
        return this.set("hasInvalidValue", args);
    }
    getCommandMention(): this {
        return this.set("getCommandMention", true);
    }
    
    getResource(args: {resources: string, resource: string, }): this {
        return this.set("getResource", args);
    }
    getName(): this {
        return this.set("getName", true);
    }
    
    getValueString(): this {
        return this.set("getValueString", true);
    }
    
    getKeyName(): this {
        return this.set("getKeyName", true);
    }
    
    help(): this {
        return this.set("help", true);
    }
    
    getResourceValue(args: {resources: string, }): this {
        return this.set("getResourceValue", args);
    }
    getCategory(): this {
        return this.set("getCategory", true);
    }
    
    hasValue(args: {checkDelegate?: string, }): this {
        return this.set("hasValue", args);
    }
    name(): this {
        return this.set("name", true);
    }
    
    toString(): this {
        return this.set("toString", true);
    }
    
}


class Transaction2Builder extends AbstractBuilder {
    constructor() {
        super();
        this.data.type = "Transaction2";
    }

    getResourceValue(args: {resources: string, }): this {
        return this.set("getResourceValue", args);
    }
    getResource(args: {resources: string, resource: string, }): this {
        return this.set("getResource", args);
    }
}


class TreatyBuilder extends AbstractBuilder {
    constructor() {
        super();
        this.data.type = "Treaty";
    }

    getFromId(): this {
        return this.set("getFromId", true);
    }
    
    toLineString(): this {
        return this.set("toLineString", true);
    }
    
    isPending(): this {
        return this.set("isPending", true);
    }
    
    getEndTime(): this {
        return this.set("getEndTime", true);
    }
    
    getType(): this {
        return this.set("getType", true);
    }
    
    getDate(): this {
        return this.set("getDate", true);
    }
    
    getTo(): this {
        return this.set("getTo", true);
    }
    
    getId(): this {
        return this.set("getId", true);
    }
    
    getTurnEnds(): this {
        return this.set("getTurnEnds", true);
    }
    
    getFrom(): this {
        return this.set("getFrom", true);
    }
    
    getResource(args: {resources: string, resource: string, }): this {
        return this.set("getResource", args);
    }
    isAlliance(args: {fromOrTo: string, }): this {
        return this.set("isAlliance", args);
    }
    getResourceValue(args: {resources: string, }): this {
        return this.set("getResourceValue", args);
    }
    getToId(): this {
        return this.set("getToId", true);
    }
    
    getTurnsRemaining(): this {
        return this.set("getTurnsRemaining", true);
    }
    
}


class ContinentBuilder extends AbstractBuilder {
    constructor() {
        super();
        this.data.type = "Continent";
    }

    getResources(): this {
        return this.set("getResources", true);
    }
    
    getSeasonModifierDate(args: {date: string, }): this {
        return this.set("getSeasonModifierDate", args);
    }
    getBuildings(): this {
        return this.set("getBuildings", true);
    }
    
    hasResource(args: {type: string, }): this {
        return this.set("hasResource", args);
    }
    getResource(args: {resources: string, resource: string, }): this {
        return this.set("getResource", args);
    }
    getSeasonModifier(): this {
        return this.set("getSeasonModifier", true);
    }
    
    getName(): this {
        return this.set("getName", true);
    }
    
    getRadIndex(): this {
        return this.set("getRadIndex", true);
    }
    
    getResourceValue(args: {resources: string, }): this {
        return this.set("getResourceValue", args);
    }
    isNorth(): this {
        return this.set("isNorth", true);
    }
    
    getAverage(args: {attribute: string, filter?: string, }): this {
        return this.set("getAverage", args);
    }
    getNumNations(args: {filter?: string, }): this {
        return this.set("getNumNations", args);
    }
    getOrdinal(): this {
        return this.set("getOrdinal", true);
    }
    
    getTotal(args: {attribute: string, filter?: string, }): this {
        return this.set("getTotal", args);
    }
    getFoodRatio(): this {
        return this.set("getFoodRatio", true);
    }
    
    getAveragePer(args: {attribute: string, per: string, filter?: string, }): this {
        return this.set("getAveragePer", args);
    }
    canBuild(args: {building: string, }): this {
        return this.set("canBuild", args);
    }
}


class DBAllianceBuilder extends AbstractBuilder {
    constructor() {
        super();
        this.data.type = "DBAlliance";
    }

    getCities(): this {
        return this.set("getCities", true);
    }
    
    getNumTreasures(): this {
        return this.set("getNumTreasures", true);
    }
    
    getColor(): this {
        return this.set("getColor", true);
    }
    
    getDiscord_link(): this {
        return this.set("getDiscord_link", true);
    }
    
    getRevenueConverted(): this {
        return this.set("getRevenueConverted", true);
    }
    
    getResource(args: {resources: string, resource: string, }): this {
        return this.set("getResource", args);
    }
    getFlag(): this {
        return this.set("getFlag", true);
    }
    
    getUrl(): this {
        return this.set("getUrl", true);
    }
    
    getRank(args: {filter?: string, }): this {
        return this.set("getRank", args);
    }
    getResourceValue(args: {resources: string, }): this {
        return this.set("getResourceValue", args);
    }
    getTreasureBonus(): this {
        return this.set("getTreasureBonus", true);
    }
    
    getAlliance_id(): this {
        return this.set("getAlliance_id", true);
    }
    
    getTreatyOrdinal(args: {alliance: string, }): this {
        return this.set("getTreatyOrdinal", args);
    }
    getAcronym(): this {
        return this.set("getAcronym", true);
    }
    
    exponentialCityStrength(args: {power?: string, }): this {
        return this.set("exponentialCityStrength", args);
    }
    getDateCreated(): this {
        return this.set("getDateCreated", true);
    }
    
    getTotal(args: {attribute: string, filter?: string, }): this {
        return this.set("getTotal", args);
    }
    getScore(args: {filter?: string, }): this {
        return this.set("getScore", args);
    }
    getForum_link(): this {
        return this.set("getForum_link", true);
    }
    
    getRevenue(): this {
        return this.set("getRevenue", true);
    }
    
    getWiki_link(): this {
        return this.set("getWiki_link", true);
    }
    
    getTreatiedAllies(): this {
        return this.set("getTreatiedAllies", true);
    }
    
    getId(): this {
        return this.set("getId", true);
    }
    
    getNumWarsSince(args: {date: string, }): this {
        return this.set("getNumWarsSince", args);
    }
    getName(): this {
        return this.set("getName", true);
    }
    
    getAverage(args: {attribute: string, filter?: string, }): this {
        return this.set("getAverage", args);
    }
    countNations(args: {filter?: string, }): this {
        return this.set("countNations", args);
    }
    getAveragePer(args: {attribute: string, per: string, filter?: string, }): this {
        return this.set("getAveragePer", args);
    }
    getTreatyType(args: {alliance: string, }): this {
        return this.set("getTreatyType", args);
    }
    hasDefensiveTreaty(args: {alliances: string, }): this {
        return this.set("hasDefensiveTreaty", args);
    }
}


class UserWrapperBuilder extends AbstractBuilder {
    constructor() {
        super();
        this.data.type = "UserWrapper";
    }

    hasPermissionChannel(args: {channel: string, permission: string, }): this {
        return this.set("hasPermissionChannel", args);
    }
    getEffectiveName(): this {
        return this.set("getEffectiveName", true);
    }
    
    hasPermission(args: {permission: string, }): this {
        return this.set("hasPermission", args);
    }
    getUserName(): this {
        return this.set("getUserName", true);
    }
    
    hasAnyRoles(args: {roles: string, }): this {
        return this.set("hasAnyRoles", args);
    }
    hasRole(args: {role: string, }): this {
        return this.set("hasRole", args);
    }
    getColor(): this {
        return this.set("getColor", true);
    }
    
    hasAccess(args: {channel: string, }): this {
        return this.set("hasAccess", args);
    }
    getResource(args: {resources: string, resource: string, }): this {
        return this.set("getResource", args);
    }
    getAvatarUrl(): this {
        return this.set("getAvatarUrl", true);
    }
    
    getUrl(): this {
        return this.set("getUrl", true);
    }
    
    getResourceValue(args: {resources: string, }): this {
        return this.set("getResourceValue", args);
    }
    getEffectiveAvatarUrl(): this {
        return this.set("getEffectiveAvatarUrl", true);
    }
    
    getCreatedMs(): this {
        return this.set("getCreatedMs", true);
    }
    
    getUserId(): this {
        return this.set("getUserId", true);
    }
    
    getTimeJoinedMs(): this {
        return this.set("getTimeJoinedMs", true);
    }
    
    hasAllRoles(args: {roles: string, }): this {
        return this.set("hasAllRoles", args);
    }
    getServerAgeMs(): this {
        return this.set("getServerAgeMs", true);
    }
    
    getAgeMs(): this {
        return this.set("getAgeMs", true);
    }
    
    getNation(): this {
        return this.set("getNation", true);
    }
    
    getMention(): this {
        return this.set("getMention", true);
    }
    
    matches(args: {filter: string, }): this {
        return this.set("matches", args);
    }
    getNickname(): this {
        return this.set("getNickname", true);
    }
    
    getColorRaw(): this {
        return this.set("getColorRaw", true);
    }
    
    getOnlineStatus(): this {
        return this.set("getOnlineStatus", true);
    }
    
}


class AttackTypeBuilder extends AbstractBuilder {
    constructor() {
        super();
        this.data.type = "AttackType";
    }

    getMapUsed(): this {
        return this.set("getMapUsed", true);
    }
    
    isVictory(): this {
        return this.set("isVictory", true);
    }
    
    getUnitType(args: {index: string, }): this {
        return this.set("getUnitType", args);
    }
    getResistance(args: {success: string, }): this {
        return this.set("getResistance", args);
    }
    getDefenderMaxCasualties(args: {unit: string, attacker: string, defender: string, victory?: string, warType?: string, defAirControl?: string, attAirControl?: string, defFortified?: string, equipAttackerSoldiers?: string, equipDefenderSoldiers?: string, }): this {
        return this.set("getDefenderMaxCasualties", args);
    }
    getAttackerAvgCasualties(args: {unit: string, attacker: string, defender: string, victory?: string, warType?: string, defAirControl?: string, attAirControl?: string, defFortified?: string, equipAttackerSoldiers?: string, equipDefenderSoldiers?: string, }): this {
        return this.set("getAttackerAvgCasualties", args);
    }
    getAttackerMinCasualties(args: {unit: string, attacker: string, defender: string, victory?: string, warType?: string, defAirControl?: string, attAirControl?: string, defFortified?: string, equipAttackerSoldiers?: string, equipDefenderSoldiers?: string, }): this {
        return this.set("getAttackerMinCasualties", args);
    }
    getResource(args: {resources: string, resource: string, }): this {
        return this.set("getResource", args);
    }
    getName(): this {
        return this.set("getName", true);
    }
    
    getResourceValue(args: {resources: string, }): this {
        return this.set("getResourceValue", args);
    }
    getResistanceIT(): this {
        return this.set("getResistanceIT", true);
    }
    
    getDefenderAvgCasualties(args: {unit: string, attacker: string, defender: string, victory?: string, warType?: string, defAirControl?: string, attAirControl?: string, defFortified?: string, equipAttackerSoldiers?: string, equipDefenderSoldiers?: string, }): this {
        return this.set("getDefenderAvgCasualties", args);
    }
    getDefenderMinCasualties(args: {unit: string, attacker: string, defender: string, victory?: string, warType?: string, defAirControl?: string, attAirControl?: string, defFortified?: string, equipAttackerSoldiers?: string, equipDefenderSoldiers?: string, }): this {
        return this.set("getDefenderMinCasualties", args);
    }
    getAttackerMaxCasualties(args: {unit: string, attacker: string, defender: string, victory?: string, warType?: string, defAirControl?: string, attAirControl?: string, defFortified?: string, equipAttackerSoldiers?: string, equipDefenderSoldiers?: string, }): this {
        return this.set("getAttackerMaxCasualties", args);
    }
    canDamage(): this {
        return this.set("canDamage", true);
    }
    
}


class DBBountyBuilder extends AbstractBuilder {
    constructor() {
        super();
        this.data.type = "DBBounty";
    }

    toLineString(): this {
        return this.set("toLineString", true);
    }
    
    getResourceValue(args: {resources: string, }): this {
        return this.set("getResourceValue", args);
    }
    getAmount(): this {
        return this.set("getAmount", true);
    }
    
    getNationId(): this {
        return this.set("getNationId", true);
    }
    
    getType(): this {
        return this.set("getType", true);
    }
    
    getDate(): this {
        return this.set("getDate", true);
    }
    
    getNation(): this {
        return this.set("getNation", true);
    }
    
    getPostedBy(): this {
        return this.set("getPostedBy", true);
    }
    
    getId(): this {
        return this.set("getId", true);
    }
    
    getResource(args: {resources: string, resource: string, }): this {
        return this.set("getResource", args);
    }
}


class NationOrAllianceBuilder extends AbstractBuilder {
    constructor() {
        super();
        this.data.type = "NationOrAlliance";
    }

    getResourceValue(args: {resources: string, }): this {
        return this.set("getResourceValue", args);
    }
    isValid(): this {
        return this.set("isValid", true);
    }
    
    getResource(args: {resources: string, resource: string, }): this {
        return this.set("getResource", args);
    }
}


class TaxBracketBuilder extends AbstractBuilder {
    constructor() {
        super();
        this.data.type = "TaxBracket";
    }

    getTaxRate(): this {
        return this.set("getTaxRate", true);
    }
    
    getId(): this {
        return this.set("getId", true);
    }
    
    getMoneyRate(): this {
        return this.set("getMoneyRate", true);
    }
    
    getResource(args: {resources: string, resource: string, }): this {
        return this.set("getResource", args);
    }
    getName(): this {
        return this.set("getName", true);
    }
    
    getUrl(): this {
        return this.set("getUrl", true);
    }
    
    getResourceValue(args: {resources: string, }): this {
        return this.set("getResourceValue", args);
    }
    getAlliance_id(): this {
        return this.set("getAlliance_id", true);
    }
    
    getNationList(args: {filter?: string, }): this {
        return this.set("getNationList", args);
    }
    countNations(args: {filter?: string, }): this {
        return this.set("countNations", args);
    }
    getAlliance(): this {
        return this.set("getAlliance", true);
    }
    
    getRssRate(): this {
        return this.set("getRssRate", true);
    }
    
}


class NationColorBuilder extends AbstractBuilder {
    constructor() {
        super();
        this.data.type = "NationColor";
    }

    getName(): this {
        return this.set("getName", true);
    }
    
    isTaxable(): this {
        return this.set("isTaxable", true);
    }
    
    getResourceValue(args: {resources: string, }): this {
        return this.set("getResourceValue", args);
    }
    getVotedName(): this {
        return this.set("getVotedName", true);
    }
    
    getTurnBonus(): this {
        return this.set("getTurnBonus", true);
    }
    
    getNumNations(args: {filter?: string, }): this {
        return this.set("getNumNations", args);
    }
    getResource(args: {resources: string, resource: string, }): this {
        return this.set("getResource", args);
    }
}


class DBBanBuilder extends AbstractBuilder {
    constructor() {
        super();
        this.data.type = "DBBan";
    }

    getDiscordId(): this {
        return this.set("getDiscordId", true);
    }
    
    getResourceValue(args: {resources: string, }): this {
        return this.set("getResourceValue", args);
    }
    isExpired(): this {
        return this.set("isExpired", true);
    }
    
    hasExistingNation(): this {
        return this.set("hasExistingNation", true);
    }
    
    getDate(): this {
        return this.set("getDate", true);
    }
    
    getNation_id(): this {
        return this.set("getNation_id", true);
    }
    
    getExistingNation(): this {
        return this.set("getExistingNation", true);
    }
    
    getEndDate(): this {
        return this.set("getEndDate", true);
    }
    
    getTimeRemaining(): this {
        return this.set("getTimeRemaining", true);
    }
    
    getReason(): this {
        return this.set("getReason", true);
    }
    
    getResource(args: {resources: string, resource: string, }): this {
        return this.set("getResource", args);
    }
}


class ProjectBuilder extends AbstractBuilder {
    constructor() {
        super();
        this.data.type = "Project";
    }

    maxCities(): this {
        return this.set("maxCities", true);
    }
    
    cost(): this {
        return this.set("cost", true);
    }
    
    getApiName(): this {
        return this.set("getApiName", true);
    }
    
    isRequiredProject(args: {project: string, }): this {
        return this.set("isRequiredProject", args);
    }
    getImageUrl(): this {
        return this.set("getImageUrl", true);
    }
    
    requiredProjects(): this {
        return this.set("requiredProjects", true);
    }
    
    getResource(args: {resources: string, resource: string, }): this {
        return this.set("getResource", args);
    }
    getResourceValue(args: {resources: string, }): this {
        return this.set("getResourceValue", args);
    }
    getMarketValue(): this {
        return this.set("getMarketValue", true);
    }
    
    getAvg(args: {attribute: string, nations?: string, }): this {
        return this.set("getAvg", args);
    }
    getOutput(): this {
        return this.set("getOutput", true);
    }
    
    getResourceCost(args: {type: string, }): this {
        return this.set("getResourceCost", args);
    }
    getRequiredProject(args: {index: string, }): this {
        return this.set("getRequiredProject", args);
    }
    hasBit(args: {bitMask: string, }): this {
        return this.set("hasBit", args);
    }
    name(): this {
        return this.set("name", true);
    }
    
    requiredCities(): this {
        return this.set("requiredCities", true);
    }
    
    getTotal(args: {attribute: string, nations?: string, }): this {
        return this.set("getTotal", args);
    }
    has(args: {nation: string, }): this {
        return this.set("has", args);
    }
    hasProjectRequirements(): this {
        return this.set("hasProjectRequirements", true);
    }
    
    getCount(args: {nations?: string, }): this {
        return this.set("getCount", args);
    }
    canBuild(args: {nation: string, }): this {
        return this.set("canBuild", args);
    }
    getImageName(): this {
        return this.set("getImageName", true);
    }
    
    ordinal(): this {
        return this.set("ordinal", true);
    }
    
}


class GuildDBBuilder extends AbstractBuilder {
    constructor() {
        super();
        this.data.type = "GuildDB";
    }

    getResourceValue(args: {resources: string, }): this {
        return this.set("getResourceValue", args);
    }
    getResource(args: {resources: string, resource: string, }): this {
        return this.set("getResource", args);
    }
    getNotifcationChannel(): this {
        return this.set("getNotifcationChannel", true);
    }
    
}


class MilitaryUnitBuilder extends AbstractBuilder {
    constructor() {
        super();
        this.data.type = "MilitaryUnit";
    }

    getResourceValue(args: {resources: string, }): this {
        return this.set("getResourceValue", args);
    }
    getMaxPerDay(args: {cities: string, }): this {
        return this.set("getMaxPerDay", args);
    }
    getBuffer(): this {
        return this.set("getBuffer", true);
    }
    
    getResource(args: {resources: string, resource: string, }): this {
        return this.set("getResource", args);
    }
}


class ResourceTypeBuilder extends AbstractBuilder {
    constructor() {
        super();
        this.data.type = "ResourceType";
    }

    getBaseInput(): this {
        return this.set("getBaseInput", true);
    }
    
    getUpkeep(): this {
        return this.set("getUpkeep", true);
    }
    
    isRaw(): this {
        return this.set("isRaw", true);
    }
    
    getManufacturingMultiplier(): this {
        return this.set("getManufacturingMultiplier", true);
    }
    
    getProduction(args: {nations: string, includeNegatives: string, }): this {
        return this.set("getProduction", args);
    }
    getProject(): this {
        return this.set("getProject", true);
    }
    
    canProduceInAny(args: {continents: string, }): this {
        return this.set("canProduceInAny", args);
    }
    getResource(args: {resources: string, resource: string, }): this {
        return this.set("getResource", args);
    }
    getName(): this {
        return this.set("getName", true);
    }
    
    getResourceValue(args: {resources: string, }): this {
        return this.set("getResourceValue", args);
    }
    getBuilding(): this {
        return this.set("getBuilding", true);
    }
    
    getCap(): this {
        return this.set("getCap", true);
    }
    
    getMarketValue(): this {
        return this.set("getMarketValue", true);
    }
    
    getPollution(): this {
        return this.set("getPollution", true);
    }
    
    getContinents(): this {
        return this.set("getContinents", true);
    }
    
    getInputList(): this {
        return this.set("getInputList", true);
    }
    
    getBoostFactor(): this {
        return this.set("getBoostFactor", true);
    }
    
    getGraphId(): this {
        return this.set("getGraphId", true);
    }
    
    hasBuilding(): this {
        return this.set("hasBuilding", true);
    }
    
    isManufactured(): this {
        return this.set("isManufactured", true);
    }
    
}


class DBWarBuilder extends AbstractBuilder {
    constructor() {
        super();
        this.data.type = "DBWar";
    }

    getResourceValue(args: {resources: string, }): this {
        return this.set("getResourceValue", args);
    }
    getResource(args: {resources: string, resource: string, }): this {
        return this.set("getResource", args);
    }
}


class TaxDepositBuilder extends AbstractBuilder {
    constructor() {
        super();
        this.data.type = "TaxDeposit";
    }

    getNationInfo(args: {nationFunction: string, }): this {
        return this.set("getNationInfo", args);
    }
    getTaxId(): this {
        return this.set("getTaxId", true);
    }
    
    getResourcesMap(): this {
        return this.set("getResourcesMap", true);
    }
    
    getAmount(args: {type: string, }): this {
        return this.set("getAmount", args);
    }
    getNation(): this {
        return this.set("getNation", true);
    }
    
    getTurnsOld(): this {
        return this.set("getTurnsOld", true);
    }
    
    getId(): this {
        return this.set("getId", true);
    }
    
    getMoneyRate(): this {
        return this.set("getMoneyRate", true);
    }
    
    getInternalResourceRate(): this {
        return this.set("getInternalResourceRate", true);
    }
    
    getDateMs(): this {
        return this.set("getDateMs", true);
    }
    
    getResourcesJson(): this {
        return this.set("getResourcesJson", true);
    }
    
    getResource(args: {resources: string, resource: string, }): this {
        return this.set("getResource", args);
    }
    getResourceRate(): this {
        return this.set("getResourceRate", true);
    }
    
    getResourcesArray(): this {
        return this.set("getResourcesArray", true);
    }
    
    getDateStr(): this {
        return this.set("getDateStr", true);
    }
    
    getResourceValue(args: {resources: string, }): this {
        return this.set("getResourceValue", args);
    }
    getNationId(): this {
        return this.set("getNationId", true);
    }
    
    getMarketValue(): this {
        return this.set("getMarketValue", true);
    }
    
    getAllianceInfo(args: {allianceFunction: string, }): this {
        return this.set("getAllianceInfo", args);
    }
    getAllianceId(): this {
        return this.set("getAllianceId", true);
    }
    
    getAlliance(): this {
        return this.set("getAlliance", true);
    }
    
    getInternalMoneyRate(): this {
        return this.set("getInternalMoneyRate", true);
    }
    
}


class DBCityBuilder extends AbstractBuilder {
    constructor() {
        super();
        this.data.type = "DBCity";
    }

    getNumBuildings(): this {
        return this.set("getNumBuildings", true);
    }
    
    getCreatedMillis(): this {
        return this.set("getCreatedMillis", true);
    }
    
    getBuildingMarketCost(): this {
        return this.set("getBuildingMarketCost", true);
    }
    
    getRequiredInfra(): this {
        return this.set("getRequiredInfra", true);
    }
    
    getFreeSlots(): this {
        return this.set("getFreeSlots", true);
    }
    
    getBuildingCost(): this {
        return this.set("getBuildingCost", true);
    }
    
    getResource(args: {resources: string, resource: string, }): this {
        return this.set("getResource", args);
    }
    getUrl(): this {
        return this.set("getUrl", true);
    }
    
    getLand(): this {
        return this.set("getLand", true);
    }
    
    getAgeDays(): this {
        return this.set("getAgeDays", true);
    }
    
    getResourceValue(args: {resources: string, }): this {
        return this.set("getResourceValue", args);
    }
    getDisease(): this {
        return this.set("getDisease", true);
    }
    
    getNationId(): this {
        return this.set("getNationId", true);
    }
    
    getCrime(): this {
        return this.set("getCrime", true);
    }
    
    getInfra(): this {
        return this.set("getInfra", true);
    }
    
    getFreeInfra(): this {
        return this.set("getFreeInfra", true);
    }
    
    getNukeTurn(): this {
        return this.set("getNukeTurn", true);
    }
    
    getRevenue(): this {
        return this.set("getRevenue", true);
    }
    
    getPoweredInfra(): this {
        return this.set("getPoweredInfra", true);
    }
    
    getCommerce(): this {
        return this.set("getCommerce", true);
    }
    
    getNation(): this {
        return this.set("getNation", true);
    }
    
    getId(): this {
        return this.set("getId", true);
    }
    
    getNukeTurnEpoch(): this {
        return this.set("getNukeTurnEpoch", true);
    }
    
    getPopulation(): this {
        return this.set("getPopulation", true);
    }
    
    getBuilding(args: {building: string, }): this {
        return this.set("getBuilding", args);
    }
    getMMR(): this {
        return this.set("getMMR", true);
    }
    
    getPollution(): this {
        return this.set("getPollution", true);
    }
    
    getPowered(): this {
        return this.set("getPowered", true);
    }
    
    getRevenueValue(): this {
        return this.set("getRevenueValue", true);
    }
    
    getAgeMillis(): this {
        return this.set("getAgeMillis", true);
    }
    
}


