export const line_map = {
    "Red": "Red",
    "Org": "Orange",
    "Y": "Yellow",
    "G": "Green",
    "Blue": "Blue",
    "P": "Purple",
    "Pink": "Pink",
    "Brn": "Brown"
};

export enum ServiceType {
    SystemWide = "X",
    Rail = "R",
    Bus = "B",
    Train = "T"
}

interface LineStations {
    [key: string]: Array<[string, number, number]>;
}

interface Destinations {
    [key: string]: Array<string>;
}

interface StaticDestinationCodes {
    [line: string]: {
        [destination: string]: number;
    }
}

// Possible valid lines for any given destination
const destinations: Destinations = {
    "Howard": ["Red", "Purple", "Yellow"],
    "Loop": ["Red", "Orange", "Green", "Blue", "Purple", "Pink", "Brown"],
    "95th": ["Red"],
    "Dempster-Skokie": ["Yellow"],
    "Harlem/Lake": ["Green"],
    "Ashland/63rd": ["Green"],
    "Cottage Grove": ["Green"],
    "O'Hare": ["Blue"],
    "Forest Park": ["Blue"],
    "Linden": ["Purple"],
    "54th/Cermak": ["Pink"],
    "Kimball": ["Brown"],
    "Midway": ["Orange"]
};

// API response codes for trains running in various directions
const static_destination_codes: StaticDestinationCodes = {
    "Red": {
        "95th": 5,
        "Howard": 1,
    },
    "Orange": {
        "Midway": 5,
        "Loop": 1
    },
    "Yellow": {
        "Dempster-Skokie": 1,
        "Howard": 5
    },
    "Green": {
        "Harlem/Lake": 1,
        "Ashland/63rd": 5,
        "Cottage Grove": 5
    },
    "Blue": {
        "O'Hare": 1,
        "Forest Park": 5
    },
    "Purple": {
        "Howard": 5,
        "Linden": 1
    },
    "Pink": {
        "54th/Cermak": 5,
        "Loop": 1
    },
    "Brown": {
        "Kimball": 1,
        "Loop": 5
    }
};

const line_stations: LineStations = {
    "Red": [
        ["47th",41230,1],
        ["63rd",40910,1],
        ["69th",40990,1],
        ["79th",40240,1],
        ["87th",41430,1],
        ["95th/Dan Ryan",40450,1],
        ["Addison",41420,5],
        ["Argyle",41200,5],
        ["Belmont",41320,5],
        ["Berwyn",40340,5],
        ["Bryn Mawr",41380,5],
        ["Cermak-Chinatown",41000,1],
        ["Chicago",41450,5],
        ["Clark/Division",40630,5],
        ["Fullerton",41220,5],
        ["Garfield",41170,1],
        ["Grand",40330,5],
        ["Granville",40760,5],
        ["Harrison",41490,1],
        ["Howard",40900,5],
        ["Jackson",40560,-1],
        ["Jarvis",41190,5],
        ["Lake",41660,-1],
        ["Lawrence",40770,5],
        ["Loyola",41300,5],
        ["Monroe",41090,-1],
        ["Morse",40100,5],
        ["North/Clybourn",40650,5],
        ["Roosevelt",41400,1],
        ["Sheridan",40080,5],
        ["Sox-35th",40190,1],
        ["Thorndale",40880,5],
        ["Wilson",40540,5],
    ],
    "Blue": [
        ["Addison", 41240, 5],
        ["Austin", 40010, 1],
        ["Belmont", 40060, 5],
        ["California", 40570, 5],
        ["Chicago", 41410, 5],
        ["Cicero", 40970, 1],
        ["Clark/Lake", 40380, -1],
        ["Clinton", 40430, 1],
        ["Cumberland", 40230, 5],
        ["Damen", 40590, 5],
        ["Division", 40320, 5],
        ["Forest Park", 40390, 1],
        ["Grand", 40490, 5],
        ["Harlem (Forest Park)", 40980, 1],
        ["Harlem (O'Hare)", 40750, 5],
        ["Illinois Medical District", 40810, 1],
        ["Irving Park", 40550, 5],
        ["Jackson", 40070, -1],
        ["Jefferson Park", 41280, 5],
        ["Kedzie-Homan", 40250, 1],
        ["LaSalle", 41340, -1],
        ["Logan Square", 41020, 5],
        ["Monroe", 40790, -1],
        ["Montrose", 41330, 5],
        ["O'Hare", 40890, 5],
        ["Oak Park", 40180, 1],
        ["Pulaski", 40920, 1],
        ["Racine", 40470, 1],
        ["Rosemont", 40820, 5],
        ["UIC-Halsted", 40350, 1],
        ["Washington", 40370, -1],
        ["Western (Forest Park)", 40220, 1],
        ["Western (O'Hare)", 40670, 5]
    ],
    "Orange": [
        ["35th/Archer", 40120, -1],
        ["Adams/Wabash", 40680, -1],
        ["Ashland", 41060, -1],
        ["Clark/Lake", 40380, -1],
        ["Halsted", 41130, -1],
        ["Harold Washington Library-State/Van Buren", 40850, -1],
        ["Kedzie", 41150, -1],
        ["LaSalle/Van Buren", 40160, -1],
        ["Midway", 40930, -1],
        ["Pulaski", 40960, -1],
        ["Quincy", 40040, -1],
        ["Roosevelt", 41400, -1],
        ["State/Lake", 40260, -1],
        ["Washington/Wabash", 41700, -1],
        ["Washington/Wells", 40730, -1],
        ["Western", 40310, -1]
    ],
    "Yellow": [
        ["Dempster-Skokie", 40140, -1],
        ["Howard", 40900, -1],
        ["Oakton-Skokie", 41680, -1]
    ],
    "Green": [
        ["35th-Bronzeville-IIT", 41220, 1],
        ["43rd", 41270, 1],
        ["47th", 41080, 1],
        ["51st", 40130, 1],
        ["Adams/Wabash", 40680, -1],
        ["Ashland", 40170, 5],
        ["Ashland/63rd", 40290, 1],
        ["Austin", 41260, 5],
        ["California", 41360, 5],
        ["Central", 40280, 5],
        ["Cermak-McCormick Place", 41690, 1],
        ["Cicero", 40480, 5],
        ["Clark/Lake", 40380, -1],
        ["Clinton", 41160, 5],
        ["Conservatory-Central Park Drive", 41670, 5],
        ["Cottage Grove", 40720, 1],
        ["Garfield", 40510, 1],
        ["Halsted", 40940, 1],
        ["Harlem/Lake", 40020, 5],
        ["Indiana", 40300, 1],
        ["Kedzie", 41070, 5],
        ["King Drive", 41140, 1],
        ["Laramie", 40700, 5],
        ["Morgan", 41510, 5],
        ["Oak Park", 41350, 5],
        ["Pulaski", 40030, 5],
        ["Ridgeland", 40610, 5],
        ["Roosevelt", 41400, 1],
        ["State/Lake", 40260, -1],
        ["Washington/Wabash", 41700, -1]
    ],
    "Purple": [
        ["Adams/Wabash", 40680, -1],
        ["Armitage", 40660, -1],
        ["Belmont", 41320, -1],
        ["Central", 41250, -1],
        ["Chicago", 40710, -1],
        ["Clark/Lake", 40380, -1],
        ["Davis", 40050, -1],
        ["Dempster", 40690, -1],
        ["Diversey", 40530, -1],
        ["Foster", 40520, -1],
        ["Fullerton", 41220, -1],
        ["Harold Washington Library-State/Van Buren", 40850, -1],
        ["Howard", 40900, -1],
        ["LaSalle/Van Buren", 40160, -1],
        ["Linden", 41070, -1],
        ["Main", 40270, -1],
        ["Merchandise Mart", 40460, -1],
        ["Noyes", 40400, -1],
        ["Quincy", 40040, -1],
        ["Sedgwick", 40800, -1],
        ["South Boulevard", 40840, -1],
        ["State/Lake", 40260, -1],
        ["Washington/Wabash", 41700, -1],
        ["Washington/Wells", 40730, -1],
        ["Wellington", 41210, -1],
        ["Wilson", 40540, -1]
    ],
    "Pink": [
        ["18th", 40830, -1],
        ["54th/Cermak", 40580, -1],
        ["Adams/Wabash", 40680, -1],
        ["Ashland", 40170, -1],
        ["California", 40440, -1],
        ["Central Park", 40780, -1],
        ["Cicero", 40420, -1],
        ["Clark/Lake", 40380, -1],
        ["Clinton", 41160, -1],
        ["Damen", 40210, -1],
        ["Harold Washington Library-State/Van Buren", 40850, -1],
        ["Kedzie", 41040, -1],
        ["Kostner", 40600, -1],
        ["LaSalle/Van Buren", 40160, -1],
        ["Morgan", 41510, -1],
        ["Polk", 41030, -1],
        ["Pulaski", 40150, -1],
        ["Quincy", 40040, -1],
        ["State/Lake", 40260, -1],
        ["Washington/Wabash", 41700, -1],
        ["Washington/Wells", 40730, -1],
        ["Western", 40740, -1]
    ],
    "Brown": [
        ["Adams/Wabash", 40680, -1],
        ["Addison", 41440, -1],
        ["Armitage", 40660, -1],
        ["Belmont", 41320, -1],
        ["Chicago", 40710, -1],
        ["Clark/Lake", 40380, -1],
        ["Damen", 40090, -1],
        ["Diversey", 40530, -1],
        ["Francisco", 40870, -1],
        ["Fullerton", 41220, -1],
        ["Harold Washington Library-State/Van Buren", 40850, -1],
        ["Irving Park", 41460, -1],
        ["Kedzie", 41180, -1],
        ["Kimball", 41290, -1],
        ["LaSalle/Van Buren", 40160, -1],
        ["Merchandise Mart", 40460, -1],
        ["Montrose", 41500, -1],
        ["Paulina", 41310, -1],
        ["Quincy", 40040, -1],
        ["Rockwell", 41010, -1],
        ["Sedgwick", 40800, -1],
        ["Southport", 40360, -1],
        ["State/Lake", 40260, -1],
        ["Washington/Wabash", 41700, -1],
        ["Washington/Wells", 40730, -1],
        ["Wellington", 41210, -1],
        ["Western", 41480, -1]
    ]
};

export const uri_safe_station_id_map: { [key: string]: number } = {
    "18th": 40830,
    "35th-bronzeville-iit": 41220,
    "35th-archer": 40120,
    "43rd": 41270,
    "47th-green": 41080,
    "47th-red": 41230,
    "51st": 40130,
    "54th-cermak": 40580,
    "63rd": 40910,
    "69th": 40990,
    "79th": 40240,
    "87th": 41430,
    "95th-danryan": 40450,
    "adams-wabash": 40680,
    "addison-brown": 41440,
    "addison-blue": 41240,
    "addison-red": 41420,
    "argyle": 41200,
    "armitage": 40660,
    "ashland": 40170,
    "ashland-orange": 41060,
    "ashland-63rd": 40290,
    "austin-blue": 40010,
    "austin-green": 41260,
    "belmont": 41320,
    "belmont-blue": 40060,
    "berwyn": 40340,
    "brynmawr": 41380,
    "california-pink": 40440,
    "california-blue": 40570,
    "california-green": 41360,
    "central-purple": 41250,
    "central-green": 40280,
    "centralpark": 40780,
    "cermak-chinatown": 41000,
    "cermak-mccormickplace": 41690,
    "cermak-mcp": 41690,
    "chicago-purple-brown": 40710,
    "chicago-blue": 41410,
    "chicago-red": 41450,
    "cicero-pink": 40420,
    "cicero-blue": 40970,
    "cicero-green": 40480,
    "clark-division": 40630,
    "clark-lake": 40380,
    "clinton": 41160,
    "clinton-blue": 40430,
    "conservatory-centralparkdrive": 41670,
    "conservatory": 41670,
    "cottagegrove": 40720,
    "cumberland": 40230,
    "damen-brown": 40090,
    "damen-pink": 40210,
    "damen-blue": 40590,
    "davis": 40050,
    "dempster": 40690,
    "dempster-skokie": 40140,
    "diversey": 40530,
    "division": 40320,
    "forestpark": 40390,
    "foster": 40520,
    "francisco": 40870,
    "fullerton": 41220,
    "garfield-green": 40510,
    "garfield-red": 41170,
    "grand-blue": 40490,
    "grand-red": 40330,
    "granville": 40760,
    "halsted-green": 40940,
    "halsted-orange": 41130,
    "harlem-fp": 40980,
    "harlem-ohare": 40750,
    "harlem-lake": 40020,
    "haroldwashingtonlibrary-state-vanburen": 40850,
    "library": 40850,
    "harrison": 41490,
    "howard": 40900,
    "illinoismedicaldistrict": 40810,
    "imd": 40810,
    "indiana": 40300,
    "irvingpark-brown": 41460,
    "irvingpark-blue": 40550,
    "jackson-blue": 40070,
    "jackson-red": 40560,
    "jarvis": 41190,
    "jeffersonpark": 41280,
    "kedzie-brown": 41180,
    "kedzie-pink": 41040,
    "kedzie-green": 41070,
    "kedzie-orange": 41150,
    "kedzie-homan": 40250,
    "kimball": 41290,
    "kingdrive": 41140,
    "kostner": 40600,
    "lake": 41660,
    "laramie": 40700,
    "lasalle": 41340,
    "lasalle-vanburen": 40160,
    "lawrence": 40770,
    "linden": 41070,
    "logansquare": 41020,
    "loyola": 41300,
    "main": 40270,
    "merchandisemart": 40460,
    "midway": 40930,
    "monroe-blue": 40790,
    "monroe-red": 41090,
    "montrose-brown": 41500,
    "montrose-blue": 41330,
    "morgan": 41510,
    "morse": 40100,
    "north-clybourn": 40650,
    "noyes": 40400,
    "ohare": 40890,
    "oakpark-blue": 40180,
    "oakpark-green": 41350,
    "oakton-skokie": 41680,
    "paulina": 41310,
    "polk": 41030,
    "pulaski-pink": 40150,
    "pulaski-blue": 40920,
    "pulaski-green": 40030,
    "pulaski-orange": 40960,
    "quincy": 40040,
    "racine": 40470,
    "ridgeland": 40610,
    "rockwell": 41010,
    "roosevelt": 41400,
    "rosemont": 40820,
    "sedgwick": 40800,
    "sheridan": 40080,
    "southboulevard": 40840,
    "southport": 40360,
    "sox-35th": 40190,
    "state-lake": 40260,
    "thorndale": 40880,
    "uic-halsted": 40350,
    "washington": 40370,
    "washington-wabash": 41700,
    "washington-wells": 40730,
    "wellington": 41210,
    "western-brown": 41480,
    "western-pink": 40740,
    "western-fp": 40220,
    "western-ohare": 40670,
    "western-orange": 40310,
    "wilson": 40540
};

/**
 * Based on a station name and a requested line, finds a specific station with a station ID.
 *
 * @param station   The name of the station.
 * @param line      The name of the line.
 */
const resolved_station = (station: string, line: string): [string, number, number] => {
    const matching_stations = line_stations[line].filter(x => x[0] === station);

    if (matching_stations.length === 0) return null;

    return matching_stations[0];
};

/**
 * Based on a station name and a line name, returns a station code.
 *
 * @param station   The name of the station.
 * @param line      The name of the line.
 */
export const station_id = (station: string, line: string): number => {
    const res = resolved_station(station, line);

    return res[1];
};

/**
 * Given a destination and a line, verifies that that line operates toward that destination at least part of the time.
 *
 * @param destination
 * @param line
 */
export const validate_destination = (destination: string, line: string): boolean => {
    return destinations[destination].includes(line);
};

/**
 * Given a destination, return all lines that ever run service to that destination.
 *
 * @param destination   The destination.
 */
export const find_possible_lines = (destination: string): Array<string> => {
    if (!destinations[destination]) return null;

    return destinations[destination];
};

/**
 *
 * @param destination
 * @param line
 * @param station
 */
export const get_destination_code = (destination: string, line: string, station: string): number => {
    if (static_destination_codes[line][destination])
        return static_destination_codes[line][destination];

    const res = resolved_station(station, line);
    return res[2];
};