const STORAGE_KEY = "motoledger_state_v1";
const ACCOUNT_SESSION_KEY = "motoledger_account_session_v1";
const ACCOUNT_INDEX_KEY = "motoledger_accounts_v1";
const ACCOUNT_STATE_PREFIX = "motoledger_account_state_v1_";

const maintenanceTemplates = {
  Honda: {
    models: {
      "CB500F": [
        task("Engine oil and filter", "Lubrication", 6000, 12, "Use manufacturer grade oil and replace filter."),
        task("Chain clean, slack, and lubrication", "Final drive", 800, 1, "Clean, lubricate, and adjust slack after wet rides."),
        task("Brake system inspection", "Brakes", 6000, 12, "Inspect pads, discs, hoses, and lever feel."),
        task("Brake fluid replacement", "Brakes", null, 24, "Replace fluid and bleed the system."),
        task("Air filter inspection", "Intake", 12000, 18, "Inspect more often in dusty riding conditions."),
        task("Spark plug replacement", "Ignition", 24000, 36, "Replace plugs and inspect coils."),
        task("Coolant replacement", "Cooling", null, 36, "Flush and refill coolant."),
        task("Valve clearance inspection", "Engine", 24000, 36, "Inspect and adjust valve clearance.")
      ],
      "Africa Twin": [
        task("Engine oil and filter", "Lubrication", 6400, 12, "Adventure riding can shorten this interval."),
        task("Chain clean, slack, and lubrication", "Final drive", 800, 1, "Inspect after rain, trails, and long highway days."),
        task("Spoke and wheel inspection", "Chassis", 6400, 12, "Check spoke tension, rims, bearings, and tyre condition."),
        task("Brake system inspection", "Brakes", 6400, 12, "Inspect pads, discs, hoses, and ABS tone rings."),
        task("Air filter inspection", "Intake", 12000, 12, "Shorten interval in dusty use."),
        task("Brake fluid replacement", "Brakes", null, 24, "Replace fluid and bleed system."),
        task("Coolant replacement", "Cooling", null, 36, "Flush and refill coolant."),
        task("Valve clearance inspection", "Engine", 24000, 36, "Inspect and adjust valve clearance.")
      ]
    }
  },
  Yamaha: {
    models: {
      "MT-07": [
        task("Engine oil and filter", "Lubrication", 5000, 12, "Replace oil and filter with the correct JASO MA grade."),
        task("Chain clean, slack, and lubrication", "Final drive", 800, 1, "Clean, lube, and adjust slack."),
        task("Brake system inspection", "Brakes", 5000, 12, "Inspect pads, discs, hoses, and brake light operation."),
        task("Air filter inspection", "Intake", 10000, 18, "Inspect more often in dusty or wet conditions."),
        task("Spark plug replacement", "Ignition", 20000, 36, "Replace plugs and inspect ignition leads."),
        task("Coolant replacement", "Cooling", null, 36, "Flush and refill coolant."),
        task("Brake fluid replacement", "Brakes", null, 24, "Replace fluid and bleed system."),
        task("Valve clearance inspection", "Engine", 40000, 48, "Inspect and adjust valve clearance.")
      ],
      "R3": [
        task("Engine oil and filter", "Lubrication", 5000, 12, "Replace oil and filter."),
        task("Chain clean, slack, and lubrication", "Final drive", 800, 1, "Clean, lubricate, and adjust slack."),
        task("Brake system inspection", "Brakes", 5000, 12, "Inspect pads, discs, hoses, and brake feel."),
        task("Air filter inspection", "Intake", 10000, 18, "Inspect and replace if dirty."),
        task("Spark plug replacement", "Ignition", 20000, 36, "Replace plugs."),
        task("Brake fluid replacement", "Brakes", null, 24, "Replace fluid and bleed system."),
        task("Coolant replacement", "Cooling", null, 36, "Flush and refill coolant."),
        task("Valve clearance inspection", "Engine", 40000, 48, "Inspect and adjust valve clearance.")
      ]
    }
  },
  Kawasaki: {
    models: {
      "Ninja 400": [
        task("Engine oil and filter", "Lubrication", 6000, 12, "Replace oil and filter."),
        task("Chain clean, slack, and lubrication", "Final drive", 800, 1, "Clean, lube, and adjust slack."),
        task("Brake system inspection", "Brakes", 6000, 12, "Inspect pads, discs, hoses, and fluid level."),
        task("Air filter inspection", "Intake", 12000, 18, "Inspect more often in dusty conditions."),
        task("Spark plug replacement", "Ignition", 12000, 24, "Replace plugs."),
        task("Brake fluid replacement", "Brakes", null, 24, "Replace fluid and bleed system."),
        task("Coolant replacement", "Cooling", null, 36, "Flush and refill coolant."),
        task("Valve clearance inspection", "Engine", 24000, 36, "Inspect and adjust valve clearance.")
      ],
      "Z900": [
        task("Engine oil and filter", "Lubrication", 6000, 12, "Replace oil and filter."),
        task("Chain clean, slack, and lubrication", "Final drive", 800, 1, "Clean, lube, and adjust slack."),
        task("Brake system inspection", "Brakes", 6000, 12, "Inspect pads, discs, hoses, and ABS function."),
        task("Air filter inspection", "Intake", 12000, 18, "Inspect and replace if dirty."),
        task("Spark plug replacement", "Ignition", 12000, 24, "Replace plugs."),
        task("Brake fluid replacement", "Brakes", null, 24, "Replace fluid and bleed system."),
        task("Coolant replacement", "Cooling", null, 36, "Flush and refill coolant."),
        task("Valve clearance inspection", "Engine", 24000, 36, "Inspect and adjust valve clearance.")
      ]
    }
  },
  Ducati: {
    models: {
      "Monster": [
        task("Engine oil and filter", "Lubrication", 12000, 12, "Replace oil and filter."),
        task("Chain clean, slack, and lubrication", "Final drive", 800, 1, "Clean, lubricate, and adjust slack."),
        task("Brake system inspection", "Brakes", 12000, 12, "Inspect pads, discs, hoses, and fluid level."),
        task("Desmo service inspection", "Engine", 30000, 48, "Inspect valve clearances and timing belts where applicable."),
        task("Air filter replacement", "Intake", 24000, 36, "Replace air filter."),
        task("Brake fluid replacement", "Brakes", null, 24, "Replace fluid and bleed system."),
        task("Coolant replacement", "Cooling", null, 36, "Flush and refill coolant."),
        task("Tyre and chassis inspection", "Chassis", 6000, 12, "Inspect tyres, bearings, suspension, and fasteners.")
      ],
      "Multistrada V4": [
        task("Engine oil and filter", "Lubrication", 15000, 12, "Replace oil and filter."),
        task("Chain clean, slack, and lubrication", "Final drive", 800, 1, "Clean, lubricate, and adjust slack."),
        task("Brake system inspection", "Brakes", 15000, 12, "Inspect pads, discs, hoses, and fluid level."),
        task("Air filter replacement", "Intake", 30000, 36, "Replace air filter."),
        task("Brake fluid replacement", "Brakes", null, 24, "Replace fluid and bleed system."),
        task("Coolant replacement", "Cooling", null, 36, "Flush and refill coolant."),
        task("Valve clearance inspection", "Engine", 60000, 60, "Inspect and adjust valve clearance."),
        task("Tyre and chassis inspection", "Chassis", 7500, 12, "Inspect tyres, bearings, suspension, and fasteners.")
      ]
    }
  },
  BMW: {
    models: {
      "R 1250 GS": [
        task("Engine oil and filter", "Lubrication", 10000, 12, "Replace oil and filter."),
        task("Final drive oil change", "Final drive", 20000, 24, "Replace final drive oil."),
        task("Brake system inspection", "Brakes", 10000, 12, "Inspect pads, discs, hoses, and ABS function."),
        task("Valve clearance inspection", "Engine", 20000, 24, "Inspect and adjust valve clearance."),
        task("Air filter replacement", "Intake", 20000, 24, "Replace air filter."),
        task("Brake fluid replacement", "Brakes", null, 24, "Replace fluid and bleed system."),
        task("Coolant replacement", "Cooling", null, 36, "Flush and refill coolant if liquid cooled."),
        task("Tyre and chassis inspection", "Chassis", 10000, 12, "Inspect tyres, bearings, suspension, and fasteners.")
      ],
      "S 1000 RR": [
        task("Engine oil and filter", "Lubrication", 10000, 12, "Replace oil and filter."),
        task("Chain clean, slack, and lubrication", "Final drive", 800, 1, "Clean, lubricate, and adjust slack."),
        task("Brake system inspection", "Brakes", 10000, 12, "Inspect pads, discs, hoses, and ABS function."),
        task("Air filter replacement", "Intake", 20000, 24, "Replace air filter."),
        task("Spark plug replacement", "Ignition", 20000, 24, "Replace plugs."),
        task("Brake fluid replacement", "Brakes", null, 24, "Replace fluid and bleed system."),
        task("Coolant replacement", "Cooling", null, 36, "Flush and refill coolant."),
        task("Valve clearance inspection", "Engine", 30000, 36, "Inspect and adjust valve clearance.")
      ]
    }
  },
  Triumph: {
    models: {
      "Street Triple": [
        task("Engine oil and filter", "Lubrication", 10000, 12, "Replace oil and filter."),
        task("Chain clean, slack, and lubrication", "Final drive", 800, 1, "Clean, lubricate, and adjust slack."),
        task("Brake system inspection", "Brakes", 10000, 12, "Inspect pads, discs, hoses, and fluid level."),
        task("Air filter replacement", "Intake", 20000, 24, "Replace air filter."),
        task("Spark plug replacement", "Ignition", 20000, 24, "Replace plugs."),
        task("Brake fluid replacement", "Brakes", null, 24, "Replace fluid and bleed system."),
        task("Coolant replacement", "Cooling", null, 36, "Flush and refill coolant."),
        task("Valve clearance inspection", "Engine", 20000, 24, "Inspect and adjust valve clearance.")
      ],
      "Bonneville T120": [
        task("Engine oil and filter", "Lubrication", 10000, 12, "Replace oil and filter."),
        task("Chain clean, slack, and lubrication", "Final drive", 800, 1, "Clean, lubricate, and adjust slack."),
        task("Brake system inspection", "Brakes", 10000, 12, "Inspect pads, discs, hoses, and fluid level."),
        task("Air filter replacement", "Intake", 20000, 24, "Replace air filter."),
        task("Spark plug replacement", "Ignition", 20000, 24, "Replace plugs."),
        task("Brake fluid replacement", "Brakes", null, 24, "Replace fluid and bleed system."),
        task("Coolant replacement", "Cooling", null, 36, "Flush and refill coolant."),
        task("Valve clearance inspection", "Engine", 20000, 24, "Inspect and adjust valve clearance.")
      ]
    }
  }
};

const modelGenerations = {};

extendMaintenanceTemplates({
  Aprilia: {
    "RS 660": sportChainTemplate({ oilKm: 10000, valveKm: 20000, airKm: 20000, sparkKm: 20000 }),
    "Tuono 660": sportChainTemplate({ oilKm: 10000, valveKm: 20000, airKm: 20000, sparkKm: 20000 }),
    "Tuareg 660": adventureChainTemplate({ oilKm: 10000, valveKm: 20000, airKm: 20000, airMonths: 12 })
  },
  BMW: {
    "R 1200 GS": shaftTemplate({ oilKm: 10000, valveKm: 10000, finalDriveKm: 20000 }),
    "R 1300 GS": shaftTemplate({ oilKm: 10000, valveKm: 20000, finalDriveKm: 20000 }),
    "F 850 GS": adventureChainTemplate({ oilKm: 10000, valveKm: 20000, airKm: 20000 }),
    "F 900 GS": adventureChainTemplate({ oilKm: 10000, valveKm: 20000, airKm: 20000 })
  },
  Ducati: {
    "Multistrada 1200 / 1260": desmoChainTemplate({ oilKm: 15000, valveKm: 30000, airKm: 30000 }),
    "Scrambler": desmoChainTemplate({ oilKm: 12000, valveKm: 24000, airKm: 24000 })
  },
  "Harley-Davidson": {
    "Pan America 1250": adventureChainTemplate({ oilKm: 8000, valveKm: 24000, airKm: 16000 }),
    "Sportster S": beltTemplate({ oilKm: 8000, airKm: 16000, coolantMonths: 36 }),
    "Nightster": beltTemplate({ oilKm: 8000, airKm: 16000, coolantMonths: 36 })
  },
  Honda: {
    "CB500X / NX500": adventureChainTemplate({ oilKm: 6000, valveKm: 24000, airKm: 12000 }),
    "Rebel 500": cruiserChainTemplate({ oilKm: 6000, valveKm: 24000, airKm: 12000 }),
    "CB650R / CBR650R": sportChainTemplate({ oilKm: 6000, valveKm: 24000, airKm: 12000, sparkKm: 24000 }),
    "NC750X": chainTemplate({ oilKm: 12000, valveKm: 24000, airKm: 24000, sparkKm: 48000 })
  },
  Kawasaki: {
    "Ninja 500": sportChainTemplate({ oilKm: 6000, valveKm: 24000, airKm: 12000, sparkKm: 12000 }),
    "Versys 650": adventureChainTemplate({ oilKm: 6000, valveKm: 42000, airKm: 12000 }),
    "Ninja 650 / Z650": sportChainTemplate({ oilKm: 6000, valveKm: 42000, airKm: 12000 }),
    "KLR650": adventureChainTemplate({ oilKm: 6000, valveKm: 24000, airKm: 12000 })
  },
  KTM: {
    "390 Duke": sportChainTemplate({ oilKm: 7500, valveKm: 15000, airKm: 15000 }),
    "390 Adventure": adventureChainTemplate({ oilKm: 7500, valveKm: 15000, airKm: 15000 }),
    "790 Duke": sportChainTemplate({ oilKm: 15000, valveKm: 30000, airKm: 15000 }),
    "890 Adventure": adventureChainTemplate({ oilKm: 15000, valveKm: 30000, airKm: 15000 })
  },
  "Royal Enfield": {
    "Himalayan": adventureChainTemplate({ oilKm: 5000, valveKm: 5000, airKm: 10000, sparkKm: 10000 }),
    "Himalayan 450": adventureChainTemplate({ oilKm: 10000, valveKm: 10000, airKm: 10000 }),
    "Interceptor 650": classicChainTemplate({ oilKm: 5000, valveKm: 10000, airKm: 10000 }),
    "Classic 350": classicChainTemplate({ oilKm: 5000, valveKm: 5000, airKm: 10000 })
  },
  Suzuki: {
    "SV650": sportChainTemplate({ oilKm: 6000, valveKm: 24000, airKm: 18000, sparkKm: 12000 }),
    "V-Strom 650": adventureChainTemplate({ oilKm: 6000, valveKm: 24000, airKm: 18000 }),
    "GSX-8S / GSX-8R": sportChainTemplate({ oilKm: 6000, valveKm: 24000, airKm: 18000 }),
    "V-Strom 800DE": adventureChainTemplate({ oilKm: 6000, valveKm: 24000, airKm: 18000 })
  },
  Triumph: {
    "Tiger 900": adventureChainTemplate({ oilKm: 10000, valveKm: 20000, airKm: 20000 }),
    "Tiger 800": adventureChainTemplate({ oilKm: 10000, valveKm: 20000, airKm: 20000 }),
    "Trident 660": sportChainTemplate({ oilKm: 10000, valveKm: 20000, airKm: 20000 }),
    "Speed Twin 900 / Street Twin": classicChainTemplate({ oilKm: 10000, valveKm: 20000, airKm: 20000 })
  },
  Yamaha: {
    "MT-09": sportChainTemplate({ oilKm: 10000, valveKm: 40000, airKm: 20000, sparkKm: 20000 }),
    "MT-09 Tracer / Tracer 900 / Tracer 9": adventureChainTemplate({ oilKm: 10000, valveKm: 40000, airKm: 20000, sparkKm: 20000 }),
    "Tenere 700": adventureChainTemplate({ oilKm: 10000, valveKm: 40000, airKm: 20000, airMonths: 12 }),
    "XSR900": sportChainTemplate({ oilKm: 10000, valveKm: 40000, airKm: 20000, sparkKm: 20000 })
  }
});

addModelGenerations({
  Aprilia: {
    "RS 660": [
      generation("rs660-2021", "660 platform", 2021, null, "First production RS 660 generation.")
    ],
    "Tuono 660": [
      generation("tuono660-2021", "660 naked platform", 2021, null, "First Tuono 660 generation.")
    ],
    "Tuareg 660": [
      generation("tuareg660-2022", "660 adventure platform", 2022, null, "Modern Tuareg 660 platform.")
    ]
  },
  BMW: {
    "R 1200 GS": [
      generation("r1200gs-2004", "Oil-cooled R1200GS", 2004, 2012, "Hexhead/camhead era."),
      generation("r1200gs-2013", "Liquid-cooled R1200GS", 2013, 2018, "Water-cooled boxer generation.")
    ],
    "R 1250 GS": [
      generation("r1250gs-2019", "ShiftCam R1250GS", 2019, 2023, "1254 cc ShiftCam boxer.")
    ],
    "R 1300 GS": [
      generation("r1300gs-2024", "R1300GS platform", 2024, null, "1300 boxer successor.")
    ],
    "S 1000 RR": [
      generation("s1000rr-2009", "First generation", 2009, 2014, "Original S1000RR."),
      generation("s1000rr-2015", "Second generation", 2015, 2018, "Updated chassis and electronics."),
      generation("s1000rr-2019", "ShiftCam generation", 2019, 2022, "New engine and platform."),
      generation("s1000rr-2023", "Aero update", 2023, null, "Winglets and revised electronics.")
    ],
    "F 850 GS": [
      generation("f850gs-2018", "F850GS platform", 2018, 2023, "Parallel-twin F850GS.")
    ],
    "F 900 GS": [
      generation("f900gs-2024", "F900GS platform", 2024, null, "F900GS replacement generation.")
    ]
  },
  Ducati: {
    "Monster": [
      generation("monster-air-2008", "Air-cooled 696/796/1100 family", 2008, 2014, "Trellis-frame air-cooled era."),
      generation("monster-821-1200", "821/1200 liquid-cooled family", 2014, 2020, "Liquid-cooled trellis-frame family."),
      generation("monster-937", "Monster 937", 2021, null, "937 cc platform without exposed trellis frame.")
    ],
    "Multistrada 1200 / 1260": [
      generation("multistrada1200-2010", "Multistrada 1200", 2010, 2017, "1200 Testastretta family."),
      generation("multistrada1260-2018", "Multistrada 1260", 2018, 2020, "1262 cc DVT family.")
    ],
    "Multistrada V4": [
      generation("multistradav4-2021", "V4 Granturismo platform", 2021, null, "Multistrada V4 family.")
    ],
    "Scrambler": [
      generation("scrambler-2015", "First Scrambler generation", 2015, 2022, "803/1100 Scrambler family."),
      generation("scrambler-2023", "Next-Gen Scrambler", 2023, null, "Second-generation 803 cc Scrambler.")
    ]
  },
  "Harley-Davidson": {
    "Pan America 1250": [
      generation("panamerica-2021", "Revolution Max adventure platform", 2021, null, "First Pan America generation.")
    ],
    "Sportster S": [
      generation("sportsters-2021", "Revolution Max Sportster", 2021, null, "Liquid-cooled Sportster S.")
    ],
    "Nightster": [
      generation("nightster-2022", "Revolution Max Nightster", 2022, null, "Modern Nightster family.")
    ]
  },
  Honda: {
    "Africa Twin": [
      generation("africatwin-xrv650", "XRV650", 1988, 1989, "Original Africa Twin."),
      generation("africatwin-xrv750", "XRV750", 1990, 2003, "750 cc Africa Twin."),
      generation("africatwin-crf1000l", "CRF1000L", 2016, 2019, "Modern 998 cc Africa Twin."),
      generation("africatwin-crf1100l", "CRF1100L", 2020, null, "1084 cc Africa Twin.")
    ],
    "CB500F": [
      generation("cb500f-2013", "First generation", 2013, 2015, "Original 500 twin platform."),
      generation("cb500f-2016", "LED update", 2016, 2018, "Styling and suspension updates."),
      generation("cb500f-2019", "Sportier update", 2019, 2021, "Revised intake/exhaust and styling."),
      generation("cb500f-2022", "Front-end update", 2022, null, "Dual front discs and fork update.")
    ],
    "CB500X / NX500": [
      generation("cb500x-2013", "First generation", 2013, 2015, "Original adventure-styled 500 twin."),
      generation("cb500x-2016", "Tall-screen update", 2016, 2018, "Styling and equipment updates."),
      generation("cb500x-2019", "19-inch front wheel", 2019, 2021, "More adventure-focused chassis."),
      generation("cb500x-2022", "Front-end update", 2022, 2023, "Dual front discs and fork update."),
      generation("nx500-2024", "NX500 rename", 2024, null, "CB500X successor naming.")
    ],
    "Rebel 500": [
      generation("rebel500-2017", "CMX500 Rebel", 2017, null, "Modern Rebel 500 platform.")
    ],
    "CB650R / CBR650R": [
      generation("cb650r-2019", "Neo Sports Cafe / CBR650R", 2019, 2023, "650 inline-four platform."),
      generation("cb650r-2024", "E-Clutch option update", 2024, null, "Updated 650 platform.")
    ],
    "NC750X": [
      generation("nc700x-2012", "NC700X", 2012, 2013, "Original 670 cc NC platform."),
      generation("nc750x-2014", "NC750X", 2014, 2020, "745 cc NC platform."),
      generation("nc750x-2021", "Lower, updated NC750X", 2021, null, "Revised frame and electronics.")
    ]
  },
  Kawasaki: {
    "Ninja 400": [
      generation("ninja400-2018", "EX400 platform", 2018, 2023, "399 cc Ninja 400 generation.")
    ],
    "Ninja 500": [
      generation("ninja500-2024", "451 cc Ninja 500", 2024, null, "Ninja 500 successor platform.")
    ],
    "Z900": [
      generation("z900-2017", "First Z900", 2017, 2019, "948 cc Z900 launch generation."),
      generation("z900-2020", "TFT/electronics update", 2020, 2024, "Updated electronics and styling."),
      generation("z900-2025", "2025 update", 2025, null, "Updated chassis/electronics generation.")
    ],
    "Versys 650": [
      generation("versys650-2007", "First generation", 2007, 2009, "Original Versys 650."),
      generation("versys650-2010", "Second generation", 2010, 2014, "Styling and chassis updates."),
      generation("versys650-2015", "Third generation", 2015, 2021, "Touring-oriented update."),
      generation("versys650-2022", "TFT/traction control update", 2022, null, "Updated electronics.")
    ],
    "Ninja 650 / Z650": [
      generation("ninja650-2017", "650 twin platform update", 2017, 2019, "Lightweight 650 twin update."),
      generation("ninja650-2020", "TFT update", 2020, 2022, "TFT and styling update."),
      generation("ninja650-2023", "Traction control update", 2023, null, "Electronics update.")
    ],
    "KLR650": [
      generation("klr650-1987", "First generation", 1987, 2007, "Original KLR650."),
      generation("klr650-2008", "Second generation", 2008, 2018, "Updated bodywork and chassis."),
      generation("klr650-2022", "Fuel-injected generation", 2022, null, "Fuel injection and ABS options.")
    ]
  },
  KTM: {
    "390 Duke": [
      generation("390duke-2013", "First generation", 2013, 2016, "Original 390 Duke."),
      generation("390duke-2017", "Second generation", 2017, 2023, "TFT and ride-by-wire generation."),
      generation("390duke-2024", "Third generation", 2024, null, "399 cc engine generation.")
    ],
    "390 Adventure": [
      generation("390adv-2020", "First generation", 2020, 2024, "Original 390 Adventure."),
      generation("390adv-2025", "Second generation", 2025, null, "Updated 390 Adventure generation.")
    ],
    "790 Duke": [
      generation("790duke-2018", "Original 790 Duke", 2018, 2020, "LC8c 790 Duke."),
      generation("790duke-2023", "Relaunched 790 Duke", 2023, null, "Relaunched 790 platform.")
    ],
    "890 Adventure": [
      generation("890adv-2021", "First 890 Adventure", 2021, 2022, "890 adventure platform."),
      generation("890adv-2023", "Updated 890 Adventure", 2023, null, "Revised bodywork/electronics.")
    ]
  },
  "Royal Enfield": {
    "Himalayan": [
      generation("himalayan411-2016", "Himalayan 411", 2016, 2023, "411 cc LS410 Himalayan.")
    ],
    "Himalayan 450": [
      generation("himalayan450-2024", "Sherpa 450 Himalayan", 2024, null, "Liquid-cooled 450 Himalayan.")
    ],
    "Interceptor 650": [
      generation("interceptor650-2018", "650 twin platform", 2018, null, "650 twin Interceptor.")
    ],
    "Classic 350": [
      generation("classic350-2009", "UCE Classic 350", 2009, 2020, "Unit-construction Classic 350."),
      generation("classic350-2021", "J-platform Classic 350", 2021, null, "J-series Classic 350.")
    ]
  },
  Suzuki: {
    "SV650": [
      generation("sv650-1999", "First generation", 1999, 2002, "Carbureted SV650."),
      generation("sv650-2003", "Second generation", 2003, 2012, "Fuel-injected angular-frame SV650."),
      generation("sv650-2016", "Third generation", 2016, null, "Modern round-headlight SV650.")
    ],
    "V-Strom 650": [
      generation("vstrom650-2004", "First generation", 2004, 2011, "Original DL650."),
      generation("vstrom650-2012", "Second generation", 2012, 2016, "Updated DL650."),
      generation("vstrom650-2017", "Third generation", 2017, null, "XT/bodywork update.")
    ],
    "GSX-8S / GSX-8R": [
      generation("gsx8s-2023", "776 cc 8-series platform", 2023, null, "Parallel-twin GSX-8 platform.")
    ],
    "V-Strom 800DE": [
      generation("vstrom800de-2023", "776 cc adventure platform", 2023, null, "Parallel-twin V-Strom 800DE.")
    ]
  },
  Triumph: {
    "Street Triple": [
      generation("streettriple675-2007", "675 platform", 2007, 2016, "Original 675 Street Triple family."),
      generation("streettriple765-2017", "765 platform", 2017, 2019, "First 765 Street Triple."),
      generation("streettriple765-2020", "Euro 5 update", 2020, 2022, "Updated 765 family."),
      generation("streettriple765-2023", "Moto2-derived update", 2023, null, "2023-on 765 update.")
    ],
    "Bonneville T120": [
      generation("bonnevillet120-2016", "Water-cooled T120", 2016, null, "Modern 1200 cc Bonneville T120.")
    ],
    "Tiger 800": [
      generation("tiger800-2010", "First generation", 2010, 2014, "Original Tiger 800."),
      generation("tiger800-2015", "Second generation", 2015, 2017, "XR/XC range update."),
      generation("tiger800-2018", "Third generation", 2018, 2019, "Updated equipment generation.")
    ],
    "Tiger 900": [
      generation("tiger900-2020", "Tiger 900 platform", 2020, 2023, "888 cc Tiger 900."),
      generation("tiger900-2024", "2024 update", 2024, null, "Updated Tiger 900 family.")
    ],
    "Trident 660": [
      generation("trident660-2021", "660 triple platform", 2021, null, "Modern Trident 660.")
    ],
    "Speed Twin 900 / Street Twin": [
      generation("streettwin-2016", "Street Twin", 2016, 2022, "900 cc modern classic."),
      generation("speedtwin900-2023", "Speed Twin 900 rename", 2023, null, "Renamed 900 cc modern classic.")
    ]
  },
  Yamaha: {
    "MT-07": [
      generation("mt07-2014", "First generation", 2014, 2017, "Original MT-07/FZ-07."),
      generation("mt07-2018", "Second generation", 2018, 2020, "Suspension and styling update."),
      generation("mt07-2021", "Third generation", 2021, 2024, "LED styling and Euro 5 update."),
      generation("mt07-2025", "Fourth generation", 2025, null, "Updated 2025 platform.")
    ],
    "MT-09": [
      generation("mt09-2014", "First generation", 2014, 2016, "Original MT-09/FZ-09."),
      generation("mt09-2017", "Second generation", 2017, 2020, "Updated styling/electronics."),
      generation("mt09-2021", "Third generation", 2021, 2023, "890 cc CP3 platform."),
      generation("mt09-2024", "Fourth generation", 2024, null, "Updated cockpit/bodywork.")
    ],
    "MT-09 Tracer / Tracer 900 / Tracer 9": [
      generation("tracer-2015", "MT-09 Tracer / FJ-09", 2015, 2017, "First sport-touring MT-09 Tracer."),
      generation("tracer-2018", "Tracer 900 / Tracer 900 GT", 2018, 2020, "Renamed Tracer 900 generation."),
      generation("tracer9-2021", "Tracer 9 / Tracer 9 GT", 2021, 2023, "890 cc Tracer 9 generation."),
      generation("tracer9gtplus-2024", "Tracer 9 GT+ family", 2024, null, "Updated Tracer 9 GT+ generation.")
    ],
    "R3": [
      generation("r3-2015", "First generation", 2015, 2018, "Original YZF-R3."),
      generation("r3-2019", "Second generation", 2019, 2024, "R-series styling and fork update."),
      generation("r3-2025", "Third generation", 2025, null, "Updated 2025 YZF-R3.")
    ],
    "Tenere 700": [
      generation("tenere700-2019", "First Tenere 700", 2019, 2024, "Original CP2 adventure platform."),
      generation("tenere700-2025", "2025 update", 2025, null, "Updated Tenere 700 family.")
    ],
    "XSR900": [
      generation("xsr900-2016", "First generation", 2016, 2021, "Original CP3 retro platform."),
      generation("xsr900-2022", "Second generation", 2022, null, "890 cc CP3 XSR900.")
    ]
  }
});

const starterState = {
  bike: {
    nickname: "Daily Rider",
    make: "Yamaha",
    model: "MT-07",
    year: "2021",
    plate: "ML-7421",
    vin: "",
    acquiredDate: "2024-01-12",
    baselineMileage: 9500,
    currentMileage: 18420,
    monthlyMileage: 720,
    currency: "SGD",
    generationId: "mt07-2021",
    lastMileageUpdateDate: "2026-06-27",
    lastMileageUpdateNote: "Manual odometer update",
    roadTaxRenewalDate: "2026-08-15",
    insuranceRenewalDate: "2026-07-22",
    coeRenewalDate: "2031-01-12",
    photoDataUrl: "",
    photoName: ""
  },
  manualNotes: "Manual notes: engine oil every 5,000 km or 12 months; brake fluid every 24 months; inspect chain frequently and after riding in rain.",
  serviceRecords: [
    {
      id: "rec-demo-1",
      date: "2025-09-10",
      mileage: 15120,
      mileageSource: "manual",
      workshop: "Apex Moto Works",
      tasks: ["Engine oil and filter", "Brake system inspection", "Chain clean, slack, and lubrication"],
      taskItems: [
        { name: "Engine oil and filter", type: "template", cost: 118 },
        { name: "Brake system inspection", type: "template", cost: 28 },
        { name: "Chain clean, slack, and lubrication", type: "template", cost: 22 }
      ],
      cost: 168,
      attachments: {},
      notes: "Motul 10W-40, OEM filter, chain adjusted."
    },
    {
      id: "rec-demo-2",
      date: "2026-02-18",
      mileage: 17180,
      mileageSource: "manual",
      workshop: "Northside Garage",
      tasks: ["Chain clean, slack, and lubrication", "Tyre and chassis inspection"],
      taskItems: [
        { name: "Chain clean, slack, and lubrication", type: "template", cost: 22 },
        { name: "Tyre and chassis inspection", type: "custom", cost: 20 }
      ],
      cost: 42,
      attachments: {},
      notes: "Rear tyre at 45 percent. Front pads healthy."
    }
  ],
  assistantHistory: []
};

let currentUser = loadCurrentUser();
let state = loadState();
let activeView = "dashboard";
let mileagePanelOpen = false;
let motorcycleProfileEditing = false;
let toastTimer = null;

const app = document.getElementById("app");

function task(name, category, intervalKm, intervalMonths, notes) {
  return { name, category, intervalKm, intervalMonths, notes };
}

function extendMaintenanceTemplates(catalog) {
  Object.entries(catalog).forEach(([make, models]) => {
    if (!maintenanceTemplates[make]) maintenanceTemplates[make] = { models: {} };
    Object.entries(models).forEach(([model, template]) => {
      maintenanceTemplates[make].models[model] = template;
    });
  });
}

function addModelGenerations(catalog) {
  Object.entries(catalog).forEach(([make, models]) => {
    if (!modelGenerations[make]) modelGenerations[make] = {};
    Object.entries(models).forEach(([model, generations]) => {
      modelGenerations[make][model] = generations;
    });
  });
}

function generation(id, label, startYear, endYear, notes) {
  return { id, label, startYear, endYear, notes };
}

function chainTemplate(options = {}) {
  const {
    oilKm = 6000,
    oilMonths = 12,
    chainKm = 800,
    chainMonths = 1,
    brakeKm = oilKm,
    brakeMonths = 12,
    airKm = 12000,
    airMonths = 18,
    sparkKm = 24000,
    sparkMonths = 36,
    valveKm = 24000,
    valveMonths = 36,
    coolantMonths = 36
  } = options;

  return [
    task("Engine oil and filter", "Lubrication", oilKm, oilMonths, "Replace oil and filter with the correct motorcycle oil grade."),
    task("Chain clean, slack, and lubrication", "Final drive", chainKm, chainMonths, "Clean, lubricate, and adjust slack more often after rain or dusty rides."),
    task("Brake system inspection", "Brakes", brakeKm, brakeMonths, "Inspect pads, discs, hoses, brake light operation, and lever feel."),
    task("Air filter inspection", "Intake", airKm, airMonths, "Inspect or replace sooner in dusty riding conditions."),
    task("Spark plug replacement", "Ignition", sparkKm, sparkMonths, "Replace plugs and inspect ignition leads or coils."),
    task("Brake fluid replacement", "Brakes", null, 24, "Replace fluid and bleed the system."),
    task("Coolant replacement", "Cooling", null, coolantMonths, "Flush and refill coolant where liquid cooled."),
    task("Valve clearance inspection", "Engine", valveKm, valveMonths, "Inspect and adjust valve clearance."),
    task("Tyre and chassis inspection", "Chassis", Math.max(3000, Math.round(oilKm / 2)), 12, "Inspect tyres, bearings, suspension, fasteners, and controls.")
  ];
}

function sportChainTemplate(options = {}) {
  return chainTemplate({
    brakeMonths: 12,
    ...options
  });
}

function adventureChainTemplate(options = {}) {
  return [
    ...chainTemplate({
      airMonths: 12,
      ...options
    }),
    task("Spoke and wheel inspection", "Chassis", options.spokeKm || options.oilKm || 6000, 12, "Check rims, spokes where fitted, bearings, tyre condition, and off-road wear.")
  ];
}

function cruiserChainTemplate(options = {}) {
  return chainTemplate({
    chainKm: 1000,
    chainMonths: 2,
    ...options
  });
}

function classicChainTemplate(options = {}) {
  return chainTemplate({
    chainKm: 800,
    chainMonths: 1,
    sparkKm: 12000,
    sparkMonths: 24,
    ...options
  });
}

function desmoChainTemplate(options = {}) {
  const template = chainTemplate({
    oilKm: 12000,
    valveKm: 30000,
    valveMonths: 48,
    airKm: 24000,
    ...options
  }).filter((item) => item.name !== "Valve clearance inspection");

  template.splice(7, 0, task("Desmo service inspection", "Engine", options.valveKm || 30000, options.valveMonths || 48, "Inspect valve clearances and timing belts where applicable."));
  return template;
}

function beltTemplate(options = {}) {
  const {
    oilKm = 8000,
    oilMonths = 12,
    brakeKm = oilKm,
    airKm = 16000,
    airMonths = 24,
    coolantMonths = 36,
    beltKm = 8000
  } = options;

  return [
    task("Engine oil and filter", "Lubrication", oilKm, oilMonths, "Replace oil and filter with the correct motorcycle oil grade."),
    task("Drive belt inspection", "Final drive", beltKm, 12, "Inspect belt condition, alignment, tension, and sprocket wear."),
    task("Brake system inspection", "Brakes", brakeKm, 12, "Inspect pads, discs, hoses, brake light operation, and lever feel."),
    task("Air filter inspection", "Intake", airKm, airMonths, "Inspect or replace sooner in dusty riding conditions."),
    task("Brake fluid replacement", "Brakes", null, 24, "Replace fluid and bleed the system."),
    task("Coolant replacement", "Cooling", null, coolantMonths, "Flush and refill coolant where liquid cooled."),
    task("Tyre and chassis inspection", "Chassis", Math.max(4000, Math.round(oilKm / 2)), 12, "Inspect tyres, bearings, suspension, fasteners, and controls.")
  ];
}

function shaftTemplate(options = {}) {
  const {
    oilKm = 10000,
    oilMonths = 12,
    brakeKm = oilKm,
    airKm = 20000,
    airMonths = 24,
    sparkKm = 20000,
    sparkMonths = 24,
    valveKm = 20000,
    valveMonths = 24,
    finalDriveKm = 20000
  } = options;

  return [
    task("Engine oil and filter", "Lubrication", oilKm, oilMonths, "Replace oil and filter with the correct motorcycle oil grade."),
    task("Final drive oil change", "Final drive", finalDriveKm, 24, "Replace shaft final drive oil and inspect for leaks."),
    task("Brake system inspection", "Brakes", brakeKm, 12, "Inspect pads, discs, hoses, ABS function, and lever feel."),
    task("Air filter replacement", "Intake", airKm, airMonths, "Replace air filter or shorten interval in dusty riding."),
    task("Spark plug replacement", "Ignition", sparkKm, sparkMonths, "Replace plugs and inspect ignition components."),
    task("Brake fluid replacement", "Brakes", null, 24, "Replace fluid and bleed the system."),
    task("Coolant replacement", "Cooling", null, 36, "Flush and refill coolant where liquid cooled."),
    task("Valve clearance inspection", "Engine", valveKm, valveMonths, "Inspect and adjust valve clearance."),
    task("Tyre and chassis inspection", "Chassis", Math.max(5000, Math.round(oilKm / 2)), 12, "Inspect tyres, bearings, suspension, fasteners, and controls.")
  ];
}

function loadCurrentUser() {
  try {
    const parsed = JSON.parse(localStorage.getItem(ACCOUNT_SESSION_KEY) || "null");
    if (!parsed?.email) return null;
    return {
      name: parsed.name || parsed.email,
      email: parsed.email
    };
  } catch (error) {
    return null;
  }
}

function saveCurrentUser(user) {
  currentUser = user;
  if (user) {
    localStorage.setItem(ACCOUNT_SESSION_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(ACCOUNT_SESSION_KEY);
  }
}

function loadAccounts() {
  try {
    const parsed = JSON.parse(localStorage.getItem(ACCOUNT_INDEX_KEY) || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    return {};
  }
}

function saveAccounts(accounts) {
  localStorage.setItem(ACCOUNT_INDEX_KEY, JSON.stringify(accounts));
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function getAccountStateKey(email = currentUser?.email) {
  return `${ACCOUNT_STATE_PREFIX}${compactMatch(email || "guest")}`;
}

function getStateStorageKey() {
  return currentUser?.email ? getAccountStateKey(currentUser.email) : STORAGE_KEY;
}

function loadState() {
  try {
    const raw = localStorage.getItem(getStateStorageKey());
    if (!raw) return structuredClone(starterState);
    return normalizeState(JSON.parse(raw));
  } catch (error) {
    return structuredClone(starterState);
  }
}

function normalizeState(nextState) {
  const normalized = structuredClone(starterState);
  const bike = { ...normalized.bike, ...(nextState.bike || {}) };
  const models = getModels(bike.make);
  if (models.length && !models.includes(bike.model)) bike.model = models[0];
  bike.generationId = findGenerationId(bike.make, bike.model, bike.year, bike.generationId);

  return {
    ...normalized,
    ...nextState,
    bike,
    serviceRecords: Array.isArray(nextState.serviceRecords) ? nextState.serviceRecords.map(normalizeServiceRecord) : [],
    assistantHistory: Array.isArray(nextState.assistantHistory) ? nextState.assistantHistory : []
  };
}

function normalizeServiceRecord(record) {
  const tasks = Array.isArray(record.tasks) ? record.tasks : [];
  const taskItems = Array.isArray(record.taskItems) && record.taskItems.length
    ? record.taskItems.map((item) => ({
      name: item.name || "Service item",
      type: item.type || "custom",
      cost: Number(item.cost || 0)
    }))
    : tasks.map((name) => ({ name, type: "legacy", cost: 0 }));
  const taskNames = taskItems.length ? taskItems.map((item) => item.name) : tasks;

  return {
    ...record,
    tasks: [...new Set(taskNames)],
    taskItems,
    cost: Number(record.cost || 0),
    mileageSource: record.mileageSource || "manual",
    attachments: record.attachments || {}
  };
}

function saveState() {
  localStorage.setItem(getStateStorageKey(), JSON.stringify(state));
}

function formatKm(value) {
  const numeric = Number(value || 0);
  return `${new Intl.NumberFormat("en-US").format(Math.max(0, Math.round(numeric)))} km`;
}

function formatMoney(value) {
  const currency = state.bike.currency || "USD";
  return `${currency} ${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Number(value || 0))}`;
}

function getRecordLineItems(record) {
  if (Array.isArray(record.taskItems) && record.taskItems.length) return record.taskItems;
  return (record.tasks || []).map((name) => ({ name, type: "legacy", cost: 0 }));
}

function getRecordTaskNames(record) {
  return getRecordLineItems(record).map((item) => item.name);
}

function getRecordCost(record) {
  const itemizedTotal = getRecordLineItems(record).reduce((sum, item) => sum + Number(item.cost || 0), 0);
  return itemizedTotal || Number(record.cost || 0);
}

function getRecordLineItemSummary(record) {
  return getRecordLineItems(record)
    .map((item) => item.cost ? `${item.name} (${formatMoney(item.cost)})` : item.name)
    .join(", ");
}

function getLatestMileageEvidence() {
  const latest = sortedRecords().find((record) => record.attachments?.dashboard?.dataUrl || record.mileageSource === "dashboard-photo");
  if (!latest) return `${state.bike.monthlyMileage || 0} km monthly estimate`;
  return `Photo backed on ${formatDate(latest.date)}`;
}

function formatDate(value) {
  if (!value) return "Not set";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "Not set";
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function addMonths(dateString, months) {
  if (!dateString || !months) return null;
  const date = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  date.setMonth(date.getMonth() + Number(months));
  return date.toISOString().slice(0, 10);
}

function daysUntil(dateString) {
  if (!dateString) return null;
  const today = new Date(`${todayIso()}T00:00:00`);
  const date = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  return Math.ceil((date - today) / 86400000);
}

function parseFlexibleDateFromText(text) {
  const numeric = parseDateFromText(text);
  if (numeric) return numeric;

  const months = {
    jan: "01",
    january: "01",
    feb: "02",
    february: "02",
    mar: "03",
    march: "03",
    apr: "04",
    april: "04",
    may: "05",
    jun: "06",
    june: "06",
    jul: "07",
    july: "07",
    aug: "08",
    august: "08",
    sep: "09",
    sept: "09",
    september: "09",
    oct: "10",
    october: "10",
    nov: "11",
    november: "11",
    dec: "12",
    december: "12"
  };
  const monthNames = Object.keys(months).join("|");
  const dayFirst = String(text || "").match(new RegExp(`\\b(\\d{1,2})\\s+(${monthNames})\\s+(20\\d{2})\\b`, "i"));
  if (dayFirst) return `${dayFirst[3]}-${months[dayFirst[2].toLowerCase()]}-${dayFirst[1].padStart(2, "0")}`;

  const monthFirst = String(text || "").match(new RegExp(`\\b(${monthNames})\\s+(\\d{1,2}),?\\s+(20\\d{2})\\b`, "i"));
  if (monthFirst) return `${monthFirst[3]}-${months[monthFirst[1].toLowerCase()]}-${monthFirst[2].padStart(2, "0")}`;

  return null;
}

function getMakes() {
  return Object.keys(maintenanceTemplates).sort();
}

function getModels(make = state.bike.make) {
  return Object.keys(maintenanceTemplates[make]?.models || {}).sort();
}

function getTemplate() {
  return maintenanceTemplates[state.bike.make]?.models[state.bike.model] || [];
}

function getModelGenerations(make = state.bike.make, model = state.bike.model) {
  return modelGenerations[make]?.[model] || [];
}

function findGenerationId(make, model, year, preferredId = "") {
  const generations = getModelGenerations(make, model);
  if (!generations.length) return "";
  if (preferredId && generations.some((item) => item.id === preferredId)) return preferredId;

  const numericYear = Number(year || 0);
  if (!numericYear) return generations[generations.length - 1].id;

  const matched = generations.find((item) => {
    const starts = Number(item.startYear || 0);
    const ends = item.endYear == null ? Number.POSITIVE_INFINITY : Number(item.endYear);
    return numericYear >= starts && numericYear <= ends;
  });
  return matched?.id || generations[generations.length - 1].id;
}

function getSelectedGeneration() {
  const generations = getModelGenerations();
  const selectedId = findGenerationId(state.bike.make, state.bike.model, state.bike.year, state.bike.generationId);
  return generations.find((item) => item.id === selectedId) || null;
}

function formatGenerationRange(item) {
  if (!item) return "General model";
  return `${item.startYear || ""}-${item.endYear || "present"}`;
}

function formatGenerationLabel(item) {
  if (!item) return "General model";
  return `${item.label} (${formatGenerationRange(item)})`;
}

function getRenewalItems() {
  return [
    renewalItem("Road tax", state.bike.roadTaxRenewalDate),
    renewalItem("Insurance", state.bike.insuranceRenewalDate),
    renewalItem("COE", state.bike.coeRenewalDate)
  ];
}

function renewalItem(label, date) {
  const days = date ? daysUntil(date) : null;
  let status = "unknown";
  if (days != null && days < 0) status = "overdue";
  else if (days != null && days <= 45) status = "soon";
  else if (days != null) status = "good";
  return { label, date, days, status };
}

function renewalStatusCopy(item) {
  if (!item.date) return "Date not set";
  if (item.days < 0) return `${Math.abs(item.days)} day${Math.abs(item.days) === 1 ? "" : "s"} overdue`;
  if (item.days === 0) return "Due today";
  if (item.days <= 45) return `Due in ${item.days} day${item.days === 1 ? "" : "s"}`;
  return `Due ${formatDate(item.date)}`;
}

function sortedRecords() {
  return [...state.serviceRecords].sort((a, b) => {
    const mileageDiff = Number(b.mileage || 0) - Number(a.mileage || 0);
    if (mileageDiff !== 0) return mileageDiff;
    return String(b.date || "").localeCompare(String(a.date || ""));
  });
}

function lastRecordForTask(taskName) {
  const target = taskName.toLowerCase();
  return sortedRecords().find((record) => {
    return getRecordTaskNames(record).some((item) => item.toLowerCase() === target);
  });
}

function forecastForTask(templateTask) {
  const currentMileage = Number(state.bike.currentMileage || 0);
  const baseMileage = Number(state.bike.baselineMileage || 0);
  const baseDate = state.bike.acquiredDate || todayIso();
  const lastRecord = lastRecordForTask(templateTask.name);
  const lastMileage = Number(lastRecord?.mileage ?? baseMileage);
  const lastDate = lastRecord?.date || baseDate;
  const nextKm = templateTask.intervalKm ? lastMileage + Number(templateTask.intervalKm) : null;
  const nextDate = templateTask.intervalMonths ? addMonths(lastDate, Number(templateTask.intervalMonths)) : null;
  const kmRemaining = nextKm == null ? null : nextKm - currentMileage;
  const dateRemaining = nextDate ? daysUntil(nextDate) : null;
  const isOverdueByKm = kmRemaining != null && kmRemaining <= 0;
  const isOverdueByDate = dateRemaining != null && dateRemaining <= 0;
  const isSoonByKm = kmRemaining != null && kmRemaining > 0 && kmRemaining <= 1200;
  const isSoonByDate = dateRemaining != null && dateRemaining > 0 && dateRemaining <= 45;
  const neverLogged = !lastRecord;
  let status = "good";

  if (isOverdueByKm || isOverdueByDate) {
    status = "overdue";
  } else if (isSoonByKm || isSoonByDate) {
    status = "soon";
  }

  return {
    ...templateTask,
    lastRecord,
    lastMileage,
    lastDate,
    nextKm,
    nextDate,
    kmRemaining,
    dateRemaining,
    status,
    neverLogged
  };
}

function getForecast() {
  return getTemplate().map(forecastForTask).sort((a, b) => {
    const statusRank = { overdue: 0, soon: 1, good: 2 };
    const rankDiff = statusRank[a.status] - statusRank[b.status];
    if (rankDiff !== 0) return rankDiff;
    const aKm = a.kmRemaining == null ? Number.POSITIVE_INFINITY : a.kmRemaining;
    const bKm = b.kmRemaining == null ? Number.POSITIVE_INFINITY : b.kmRemaining;
    return aKm - bKm;
  });
}

function getHealth() {
  const forecast = getForecast();
  const overdue = forecast.filter((item) => item.status === "overdue").length;
  const soon = forecast.filter((item) => item.status === "soon").length;
  const unknown = forecast.filter((item) => item.neverLogged).length;
  const recordsScore = Math.min(state.serviceRecords.length * 3, 12);
  const score = Math.max(0, Math.min(100, 96 + recordsScore - overdue * 14 - soon * 5 - unknown * 1.5));
  let label = "Excellent";
  if (score < 60) label = "Needs attention";
  else if (score < 76) label = "Watch list";
  else if (score < 90) label = "Healthy";
  return { score: Math.round(score), label, overdue, soon, unknown };
}

function getNextServicePack() {
  const forecast = getForecast();
  const overdue = forecast.filter((item) => item.status === "overdue");
  if (overdue.length) {
    return {
      label: "Due now",
      mileage: Number(state.bike.currentMileage || 0),
      tasks: overdue
    };
  }
  const upcoming = forecast.filter((item) => item.nextKm != null).sort((a, b) => a.nextKm - b.nextKm);
  if (!upcoming.length) {
    return { label: "Date based", mileage: null, tasks: forecast.slice(0, 3) };
  }
  const nextMileage = upcoming[0].nextKm;
  return {
    label: formatKm(nextMileage),
    mileage: nextMileage,
    tasks: forecast.filter((item) => {
      if (item.nextKm == null) return item.status === "soon";
      return item.nextKm <= nextMileage + 600 || item.status === "soon";
    }).slice(0, 5)
  };
}

function render() {
  const view = viewMeta()[activeView] || viewMeta().dashboard;
  app.innerHTML = `
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-mark">ML</div>
        <div>
          <p class="brand-title">Motoledger</p>
          <p class="brand-subtitle">Motorcycle asset care</p>
        </div>
      </div>
      <nav class="nav" aria-label="Main navigation">
        ${Object.entries(viewMeta()).map(([key, item]) => `
          <button class="nav-button ${key === activeView ? "active" : ""}" data-view="${key}">
            <span class="nav-glyph">${item.glyph}</span>
            <span>${item.label}</span>
          </button>
        `).join("")}
      </nav>
      <div class="sidebar-footer">
        <strong>${escapeHtml(state.bike.nickname || "Your motorcycle")}</strong>
        <p>${escapeHtml(state.bike.year)} ${escapeHtml(state.bike.make)} ${escapeHtml(state.bike.model)} at ${formatKm(state.bike.currentMileage)}.</p>
        <p>${currentUser ? `Rider: ${escapeHtml(currentUser.email)}` : "Local demo profile"}</p>
      </div>
    </aside>
    <main class="main">
      <header class="topbar">
        <div>
          <p class="page-kicker">${view.kicker}</p>
          <h1 class="page-title">${view.title}</h1>
          <p class="page-subtitle">${view.subtitle}</p>
        </div>
        <div class="toolbar">
          <button class="button" data-action="quick-mileage">Update mileage</button>
          <button class="button primary" data-view="service">Add service</button>
        </div>
      </header>
      ${mileagePanelOpen ? renderMileagePanel() : ""}
      ${renderView(activeView)}
    </main>
  `;
}

function renderMileagePanel() {
  return `
    <section class="panel pad mileage-panel">
      <div class="section-title">
        <div>
          <h2>Update odometer</h2>
          <p>Save the latest mileage without editing the full motorcycle profile.</p>
        </div>
        <span class="pill info">${formatKm(state.bike.currentMileage)}</span>
      </div>
      <form class="form-grid three" data-form="mileage">
        ${field("Current odometer", "currentMileageUpdate", state.bike.currentMileage, "number")}
        ${field("Reading date", "mileageUpdateDate", todayIso(), "date")}
        ${field("Source note", "mileageUpdateNote", state.bike.lastMileageUpdateNote || "", "text")}
        <div class="form-actions">
          <button class="button" type="button" data-action="close-mileage">Cancel</button>
          <button class="button primary" type="submit">Save mileage</button>
        </div>
      </form>
    </section>
  `;
}

function viewMeta() {
  return {
    dashboard: {
      label: "Dashboard",
      glyph: "D",
      kicker: "Garage overview",
      title: "Know what your bike needs next",
      subtitle: "Track mileage, service records, workshops, and upcoming maintenance from one working dashboard."
    },
    motorcycle: {
      label: "Motorcycle",
      glyph: "M",
      kicker: "Asset profile",
      title: "Bike details and maintenance template",
      subtitle: "Select the brand and model, then Motoledger applies a typical maintenance schedule that can be refined with manual notes."
    },
    service: {
      label: "Log service",
      glyph: "S",
      kicker: "Workshop entry",
      title: "Add a service record",
      subtitle: "Capture one workshop visit with service tasks, itemized cost, invoice proof, and dash-photo mileage."
    },
    history: {
      label: "History",
      glyph: "H",
      kicker: "Service records",
      title: "Service history and bulk import",
      subtitle: "Review past workshop visits, import older records from text, and keep resale-ready maintenance proof."
    },
    forecast: {
      label: "Forecast",
      glyph: "F",
      kicker: "Intervals",
      title: "Maintenance forecast",
      subtitle: "See overdue, upcoming, and healthy service items based on your mileage, dates, and logged workshop history."
    },
    assistant: {
      label: "Assistant",
      glyph: "A",
      kicker: "AI-ready copilot",
      title: "Ask maintenance questions",
      subtitle: "A rule-based assistant uses the selected model, service records, and manual notes now; it is ready to connect to a real AI backend later."
    },
    transfer: {
      label: "Transfer",
      glyph: "T",
      kicker: "Ownership handover",
      title: "Export service proof for the next owner",
      subtitle: "Download a transferable maintenance package or printable ownership report when selling the motorcycle."
    },
    account: {
      label: "Account",
      glyph: "U",
      kicker: "Rider profile",
      title: currentUser ? `Signed in as ${currentUser.name}` : "Sign in to your rider profile",
      subtitle: "Save bikes, maintenance records, photos, and renewal reminders under a rider account on this device."
    }
  };
}

function renderView(view) {
  if (view === "motorcycle") return renderMotorcycle();
  if (view === "service") return renderService();
  if (view === "history") return renderServiceHistory();
  if (view === "forecast") return renderForecast();
  if (view === "assistant") return renderAssistant();
  if (view === "transfer") return renderTransfer();
  if (view === "account") return renderAccount();
  return renderDashboard();
}

function renderDashboard() {
  const health = getHealth();
  const nextPack = getNextServicePack();
  const forecast = getForecast();
  const recentRecords = sortedRecords().slice(0, 3);
  const totalSpend = state.serviceRecords.reduce((sum, record) => sum + getRecordCost(record), 0);
  const scoreStyle = `--score: ${health.score}%;`;

  return `
    <div class="stack">
      ${renderBikeDashboardCard()}

      <section class="grid four">
        ${statCard("Current mileage", formatKm(state.bike.currentMileage), getLatestMileageEvidence())}
        ${statCard("Health score", `${health.score}/100`, health.label)}
        ${statCard("Next service", nextPack.label, `${nextPack.tasks.length} item${nextPack.tasks.length === 1 ? "" : "s"} in the pack`)}
        ${statCard("Service spend", formatMoney(totalSpend), `${state.serviceRecords.length} records captured`)}
      </section>

      <section class="panel pad health-panel">
        <div class="score-ring" style="${scoreStyle}">
          <div>
            <strong>${health.score}</strong>
            <span>${health.label}</span>
          </div>
        </div>
        <div>
          <div class="section-title">
            <div>
              <h2>Priority maintenance</h2>
              <p>${health.overdue} overdue, ${health.soon} coming soon, ${health.unknown} never logged.</p>
            </div>
            <span class="pill ${health.overdue ? "overdue" : health.soon ? "soon" : "good"}">${health.overdue ? "Action needed" : health.soon ? "Plan ahead" : "On track"}</span>
          </div>
          <div class="priority-list">
            ${forecast.slice(0, 4).map(renderTaskCard).join("") || `<div class="empty">Select a motorcycle model to generate a maintenance forecast.</div>`}
          </div>
        </div>
      </section>

      <section class="grid two">
        <div class="panel pad">
          <div class="section-title">
            <div>
              <h2>Next service pack</h2>
              <p>Grouped from the nearest mileage and date-based tasks.</p>
            </div>
          </div>
          <div class="priority-list">
            ${nextPack.tasks.map(renderTaskCard).join("") || `<div class="empty">No service pack available yet.</div>`}
          </div>
        </div>

        <div class="panel pad">
          <div class="section-title">
            <div>
              <h2>Recent workshop history</h2>
              <p>Latest service records for this motorcycle.</p>
            </div>
          </div>
          ${recentRecords.length ? renderTimeline(recentRecords) : `<div class="empty">No records yet. Add the first workshop visit to start building resale history.</div>`}
        </div>
      </section>
    </div>
  `;
}

function renderBikeDashboardCard() {
  const generation = getSelectedGeneration();
  const renewalItems = getRenewalItems();
  const attentionCount = renewalItems.filter((item) => item.status === "overdue" || item.status === "soon").length;

  return `
    <section class="panel pad bike-hero">
      <div class="bike-hero-media ${state.bike.photoDataUrl ? "has-photo" : ""}">
        ${state.bike.photoDataUrl ? `
          <img src="${escapeAttr(state.bike.photoDataUrl)}" alt="${escapeAttr(state.bike.nickname || "Motorcycle")}">
        ` : `
          <div class="bike-photo-placeholder">
            <span>ML</span>
            <strong>${escapeHtml(state.bike.make || "Motorcycle")}</strong>
            <p>Add a motorcycle photo in the profile.</p>
          </div>
        `}
      </div>
      <div class="bike-hero-details">
        <div class="section-title">
          <div>
            <h2>${escapeHtml(state.bike.nickname || "Your motorcycle")}</h2>
            <p>${escapeHtml(state.bike.year)} ${escapeHtml(state.bike.make)} ${escapeHtml(state.bike.model)}${generation ? ` - ${escapeHtml(formatGenerationLabel(generation))}` : ""}</p>
          </div>
          <span class="pill ${attentionCount ? "soon" : "good"}">${attentionCount ? `${attentionCount} renewal${attentionCount === 1 ? "" : "s"} soon` : "Renewals clear"}</span>
        </div>
        <div class="bike-meta-grid">
          <div>
            <span>Plate</span>
            <strong>${escapeHtml(state.bike.plate || "Not set")}</strong>
          </div>
          <div>
            <span>Mileage</span>
            <strong>${formatKm(state.bike.currentMileage)}</strong>
          </div>
          <div>
            <span>Next service</span>
            <strong>${getNextServicePack().label}</strong>
          </div>
        </div>
        <div class="renewal-list">
          ${renewalItems.map((item) => `
            <article class="renewal-item ${item.status}">
              <div>
                <strong>${escapeHtml(item.label)}</strong>
                <span>${item.date ? formatDate(item.date) : "Not set"}</span>
              </div>
              <span class="pill ${item.status === "unknown" ? "info" : item.status}">${escapeHtml(renewalStatusCopy(item))}</span>
            </article>
          `).join("")}
        </div>
        <div class="form-actions bike-hero-actions">
          <button class="button small" data-view="motorcycle">Edit profile</button>
          <button class="button small primary" data-view="service">Log service</button>
        </div>
      </div>
    </section>
  `;
}

function statCard(label, value, note) {
  return `
    <article class="panel stat">
      <div class="stat-label">${label}</div>
      <div>
        <div class="stat-value">${value}</div>
        <div class="stat-note">${note}</div>
      </div>
    </article>
  `;
}

function renderTaskCard(item) {
  const statusCopy = item.status === "overdue" ? "Overdue" : item.status === "soon" ? "Soon" : "Healthy";
  const remaining = [];
  if (item.kmRemaining != null) {
    remaining.push(item.kmRemaining <= 0 ? `${formatKm(Math.abs(item.kmRemaining))} overdue` : `${formatKm(item.kmRemaining)} left`);
  }
  if (item.dateRemaining != null) {
    remaining.push(item.dateRemaining <= 0 ? `${Math.abs(item.dateRemaining)} days overdue` : `${item.dateRemaining} days left`);
  }
  const lastDone = item.lastRecord ? `${formatKm(item.lastMileage)} at ${item.lastRecord.workshop || "workshop"}` : `No logged record since ${formatKm(state.bike.baselineMileage)}`;

  return `
    <article class="task-card">
      <div>
        <strong>${escapeHtml(item.name)}</strong>
        <p>${escapeHtml(item.category)}. ${escapeHtml(item.notes || "")}</p>
        <p>Last: ${escapeHtml(lastDone)}. Next: ${item.nextKm ? formatKm(item.nextKm) : "date based"}${item.nextDate ? ` or ${formatDate(item.nextDate)}` : ""}.</p>
      </div>
      <div>
        <span class="pill ${item.status}">${statusCopy}</span>
        <p>${remaining.join(", ") || "Watch by date"}</p>
      </div>
    </article>
  `;
}

function renderTimeline(records) {
  return `
    <div class="timeline">
      ${records.map((record) => `
        <article class="timeline-item">
          <div class="timeline-date">${formatDate(record.date)}<br>${formatKm(record.mileage)}</div>
          <div class="timeline-body">
            <strong>${escapeHtml(record.workshop || "Workshop not recorded")}</strong>
            <p>${getRecordTaskNames(record).map(escapeHtml).join(", ")}</p>
            <p>${escapeHtml(record.notes || "No notes")} ${getRecordCost(record) ? `Cost: ${formatMoney(getRecordCost(record))}.` : ""}</p>
          </div>
        </article>
      `).join("")}
    </div>
  `;
}

function renderMotorcycle() {
  const makes = getMakes();
  const models = getModels();
  const template = getTemplate();
  const generations = getModelGenerations();
  const selectedGenerationId = findGenerationId(state.bike.make, state.bike.model, state.bike.year, state.bike.generationId);

  return `
    <div class="stack">
      ${motorcycleProfileEditing ? `
      ${renderProfileAssistant()}
      ${renderMotorcycleProfileForm(makes, models, generations, selectedGenerationId)}
      ` : renderLockedMotorcycleProfile()}

      <section class="panel pad">
        <div class="section-title">
          <div>
            <h2>Manual knowledge base</h2>
            <p>Paste manual excerpts, workshop advice, or model-specific notes for the assistant and export record.</p>
          </div>
        </div>
        <form class="form-grid" data-form="manual">
          <label class="field full">
            <span>Manual notes</span>
            <textarea name="manualNotes">${escapeHtml(state.manualNotes || "")}</textarea>
          </label>
          <div class="form-actions">
            <button class="button primary" type="submit">Save notes</button>
          </div>
        </form>
      </section>

      <section class="panel pad">
        <div class="section-title">
          <div>
            <h2>Typical maintenance interval</h2>
            <p>Template for ${escapeHtml(state.bike.make)} ${escapeHtml(state.bike.model)}. Confirm against the official owner manual.</p>
          </div>
        </div>
        ${renderTemplateTable(template)}
      </section>
    </div>
  `;
}

function renderLockedMotorcycleProfile() {
  const generation = getSelectedGeneration();

  return `
    <section class="panel pad locked-profile-panel">
      <div class="section-title">
        <div>
          <h2>Motorcycle profile</h2>
          <p>Locked view. Open edit mode when you want to update profile details or add a new motorcycle.</p>
        </div>
        <span class="pill good">Locked</span>
      </div>
      <div class="locked-profile">
        <div class="profile-photo-frame">
          ${state.bike.photoDataUrl ? `
            <img src="${escapeAttr(state.bike.photoDataUrl)}" alt="${escapeAttr(state.bike.nickname || "Motorcycle")}">
          ` : `
            <div class="bike-photo-placeholder compact">
              <span>ML</span>
              <strong>${escapeHtml(state.bike.make || "Motorcycle")}</strong>
            </div>
          `}
        </div>
        <div class="locked-profile-body">
          <div class="section-title">
            <div>
              <h3>${escapeHtml(state.bike.nickname || "Your motorcycle")}</h3>
              <p>${escapeHtml(state.bike.year)} ${escapeHtml(state.bike.make)} ${escapeHtml(state.bike.model)}${generation ? ` - ${escapeHtml(formatGenerationLabel(generation))}` : ""}</p>
            </div>
          </div>
          <div class="profile-fact-grid">
            ${profileFact("Current mileage", formatKm(state.bike.currentMileage))}
            ${profileFact("Plate", state.bike.plate || "Not set")}
            ${profileFact("VIN / Chassis number", state.bike.vin || "Not set")}
            ${profileFact("Acquired", formatDate(state.bike.acquiredDate))}
            ${profileFact("Monthly use", formatKm(state.bike.monthlyMileage || 0))}
            ${profileFact("Currency", state.bike.currency || "USD")}
            ${profileFact("Road tax", state.bike.roadTaxRenewalDate ? formatDate(state.bike.roadTaxRenewalDate) : "Not set")}
            ${profileFact("Insurance", state.bike.insuranceRenewalDate ? formatDate(state.bike.insuranceRenewalDate) : "Not set")}
            ${profileFact("COE", state.bike.coeRenewalDate ? formatDate(state.bike.coeRenewalDate) : "Not set")}
          </div>
          <div class="form-actions locked-profile-actions">
            <button class="button" type="button" data-action="quick-mileage">Update mileage</button>
            <button class="button primary" type="button" data-action="edit-bike-profile">Update or add new motorcycle profile</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

function profileFact(label, value) {
  return `
    <div>
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </div>
  `;
}

function renderProfileAssistant() {
  return `
    <section class="panel pad">
      <div class="section-title">
        <div>
          <h2>Profile assistant</h2>
          <p>Paste a listing, insurance note, WhatsApp message, or guided answers and let Motoledger fill the profile fields.</p>
        </div>
      </div>
      <form class="form-grid" data-form="bike-import">
        <label class="field full">
          <span>Bike information</span>
          <textarea name="bikeBlob" placeholder="Example: 2021 Yamaha MT-07, plate ML-7421, current odometer 18,420 km, bought 2024-01-12 at 9,500 km, monthly use around 720 km, currency SGD."></textarea>
        </label>
        <div class="bike-prompt-grid">
          <button class="button small" type="button" data-action="insert-bike-prompts">Answer guided prompts</button>
          <button class="button small" type="button" data-action="use-sample-bike-import">Use sample</button>
          <button class="button small danger" type="button" data-action="clear-bike-import">Clear</button>
        </div>
        <div class="import-preview" data-bike-import-preview>
          <strong>Detected fields appear here before you apply them.</strong>
          <p class="muted">This local parser acts like the first version of an LLM intake flow. A backend LLM can later replace it with richer extraction and follow-up questions.</p>
        </div>
        <div class="form-actions">
          <button class="button" type="button" data-action="preview-bike-import">Preview extracted fields</button>
          <button class="button primary" type="submit">Apply to profile</button>
        </div>
      </form>
    </section>
  `;
}

function renderMotorcycleProfileForm(makes, models, generations, selectedGenerationId) {
  return `
    <section class="panel pad">
      <div class="section-title">
        <div>
          <h2>Motorcycle profile</h2>
          <p>Editing is unlocked. Save changes to return to the locked profile view.</p>
        </div>
        <span class="pill soon">Unlocked</span>
      </div>
      <form class="form-grid three" data-form="bike">
        ${field("Nickname", "nickname", state.bike.nickname, "text")}
        <label class="field">
          <span>Brand</span>
          <select name="make">
            ${makes.map((make) => `<option value="${escapeAttr(make)}" ${make === state.bike.make ? "selected" : ""}>${escapeHtml(make)}</option>`).join("")}
          </select>
        </label>
        <label class="field">
          <span>Model</span>
          <select name="model">
            ${models.map((model) => `<option value="${escapeAttr(model)}" ${model === state.bike.model ? "selected" : ""}>${escapeHtml(model)}</option>`).join("")}
          </select>
        </label>
        <label class="field">
          <span>Model year / version</span>
          <select name="generationId" ${generations.length ? "" : "disabled"}>
            ${generations.length ? generations.map((item) => `
              <option value="${escapeAttr(item.id)}" ${item.id === selectedGenerationId ? "selected" : ""}>${escapeHtml(formatGenerationLabel(item))}</option>
            `).join("") : `<option value="">General model</option>`}
          </select>
        </label>
        ${field("Year", "year", state.bike.year, "number")}
        ${field("Plate", "plate", state.bike.plate, "text")}
        ${field("VIN / Chassis number", "vin", state.bike.vin, "text")}
        ${field("Acquired date", "acquiredDate", state.bike.acquiredDate, "date")}
        ${field("Mileage at acquisition", "baselineMileage", state.bike.baselineMileage, "number")}
        ${field("Current mileage", "currentMileage", state.bike.currentMileage, "number")}
        ${field("Monthly mileage estimate", "monthlyMileage", state.bike.monthlyMileage, "number")}
        ${field("Currency", "currency", state.bike.currency, "text")}
        ${field("Road tax renewal", "roadTaxRenewalDate", state.bike.roadTaxRenewalDate, "date")}
        ${field("Insurance renewal", "insuranceRenewalDate", state.bike.insuranceRenewalDate, "date")}
        ${field("COE renewal", "coeRenewalDate", state.bike.coeRenewalDate, "date")}
        ${renderBikePhotoUpload()}
        <div class="form-actions">
          <button class="button danger" type="button" data-action="reset-demo">Reset demo</button>
          <button class="button" type="button" data-action="start-fresh">Start fresh</button>
          <button class="button" type="button" data-action="lock-bike-profile">Cancel</button>
          <button class="button primary" type="submit">Save profile</button>
        </div>
      </form>
    </section>
  `;
}

function renderBikePhotoUpload() {
  return `
    <div class="field full">
      <span class="label">Motorcycle photo</span>
      <label class="upload-card bike-upload-card">
        <span>${state.bike.photoName ? escapeHtml(state.bike.photoName) : "Upload motorcycle photo"}</span>
        <input name="bikePhoto" type="file" accept="image/*" data-preview-target="bike-photo-preview">
        <img data-preview="bike-photo-preview" src="${escapeAttr(state.bike.photoDataUrl || "")}" alt="" ${state.bike.photoDataUrl ? "" : "hidden"}>
      </label>
    </div>
  `;
}

function field(label, name, value, type) {
  return `
    <label class="field">
      <span>${label}</span>
      <input name="${name}" type="${type}" value="${escapeAttr(value ?? "")}">
    </label>
  `;
}

function renderTemplateTable(template) {
  if (!template.length) return `<div class="empty">No template is available for this model yet.</div>`;
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Category</th>
            <th>Mileage interval</th>
            <th>Time interval</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          ${template.map((item) => `
            <tr>
              <td><strong>${escapeHtml(item.name)}</strong></td>
              <td>${escapeHtml(item.category)}</td>
              <td>${item.intervalKm ? formatKm(item.intervalKm) : "Date based"}</td>
              <td>${item.intervalMonths ? `${item.intervalMonths} months` : "Mileage based"}</td>
              <td>${escapeHtml(item.notes)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderService() {
  const template = getTemplate();
  const dueTasks = getForecast().filter((item) => item.status !== "good").map((item) => item.name);

  return `
    <div class="stack">
      <section class="panel pad">
        <div class="section-title">
          <div>
            <h2>Add service record</h2>
            <p>Capture work done, itemized cost, invoice proof, and photo-backed odometer readings.</p>
          </div>
        </div>
        <form class="form-grid three service-form" data-form="service">
          ${field("Date", "date", todayIso(), "date")}
          ${field("Workshop", "workshop", "", "text")}
          ${field("Odometer reading", "mileage", state.bike.currentMileage, "number")}
          ${field("Invoice total", "cost", "", "number")}
          ${field("Reading from dash photo", "photoMileage", "", "number")}
          <div class="field full">
            <span class="label">Cost mode</span>
            <label class="toggle-line">
              <input type="checkbox" name="itemizeCosts" data-action="toggle-itemized">
              <span>Itemize costs by service item</span>
            </label>
            <div class="itemized-summary itemized-input">
              Itemized subtotal <strong data-itemized-subtotal>${formatMoney(0)}</strong>
            </div>
          </div>
          <label class="field full">
            <span class="label">Completed tasks</span>
            <div class="check-grid">
              ${template.map((item) => `
                <label class="check-item itemized-task" data-service-task-row>
                  <input type="checkbox" name="tasks" value="${escapeAttr(item.name)}" ${dueTasks.includes(item.name) ? "checked" : ""}>
                  <span>${escapeHtml(item.name)}<small>${escapeHtml(item.category)} - ${item.intervalKm ? formatKm(item.intervalKm) : "date based"}</small></span>
                  <input class="line-cost itemized-input" name="taskCosts" type="number" min="0" step="0.01" placeholder="Cost" data-cost-input>
                </label>
              `).join("")}
            </div>
          </label>
          <div class="field full">
            <span class="label">Custom work</span>
            <div class="custom-task-list" data-custom-task-list>
              ${renderCustomTaskRow()}
            </div>
            <div>
              <button class="button small" type="button" data-action="add-custom-task">Add custom item</button>
            </div>
          </div>
          <div class="field full">
            <span class="label">Photos</span>
            <div class="photo-grid">
              ${renderPhotoUpload("receiptPhoto", "Invoice / receipt photo", "receipt-preview")}
              ${renderPhotoUpload("dashboardPhoto", "Dash photo", "dashboard-preview")}
            </div>
            <div class="photo-extraction" data-photo-extraction>
              <strong>Photo auto-fill</strong>
              <p class="muted">Upload invoice or dash photos to auto-fill fields from readable filenames and photo metadata. OCR/LLM extraction can replace this local parser later.</p>
            </div>
          </div>
          <label class="field full">
            <span>Service notes</span>
            <textarea name="notes" placeholder="Parts used, fluid grade, problems found, warranty notes"></textarea>
          </label>
          <div class="form-actions">
            <button class="button primary" type="submit">Save service record</button>
          </div>
        </form>
      </section>
    </div>
  `;
}

function renderServiceHistory() {
  const records = sortedRecords();

  return `
    <div class="stack">
      ${renderBulkServiceImport()}
      <section class="panel pad">
        <div class="section-title">
          <div>
            <h2>Service history</h2>
            <p>${records.length} record${records.length === 1 ? "" : "s"} captured for ownership and resale proof.</p>
          </div>
        </div>
        ${records.length ? renderRecordTable(records) : `<div class="empty">No records yet. Add the first service record above.</div>`}
      </section>
    </div>
  `;
}

function renderBulkServiceImport() {
  return `
    <section class="panel pad">
      <div class="section-title">
        <div>
          <h2>Bulk service import</h2>
          <p>Paste service history, review parsed drafts, edit anything uncertain, then save confirmed records.</p>
        </div>
      </div>
      <form class="form-grid" data-form="bulk-service-import">
        <label class="field full">
          <span>Service history text</span>
          <textarea name="bulkServiceText" placeholder="2026-06-18, 18420 km, Apex Moto Works. Oil and filter SGD120, chain service SGD35. Total SGD155. Notes: OEM filter and Motul 10W-40."></textarea>
        </label>
        <div class="bulk-actions">
          <button class="button small" type="button" data-action="use-sample-bulk-service">Use sample</button>
          <button class="button small danger" type="button" data-action="clear-bulk-service">Clear</button>
        </div>
        <div class="bulk-preview empty" data-bulk-service-preview>
          Paste one or many service entries, then generate editable drafts.
        </div>
        <div class="form-actions">
          <button class="button" type="button" data-action="preview-bulk-service">Generate drafts</button>
          <button class="button primary" type="button" data-action="save-bulk-service">Save confirmed records</button>
        </div>
      </form>
    </section>
  `;
}

function renderCustomTaskRow(name = "", cost = "") {
  return `
    <div class="custom-task-row" data-custom-task-row>
      <input name="customTaskNames" type="text" placeholder="Custom task" value="${escapeAttr(name)}">
      <input class="line-cost itemized-input" name="customTaskCosts" type="number" min="0" step="0.01" placeholder="Cost" value="${escapeAttr(cost)}" data-cost-input>
      <button class="button small danger" type="button" data-action="remove-custom-task">Remove</button>
    </div>
  `;
}

function renderPhotoUpload(name, label, previewId) {
  return `
    <label class="upload-card">
      <span>${label}</span>
      <input name="${name}" type="file" accept="image/*" capture="environment" data-preview-target="${previewId}">
      <img data-preview="${previewId}" alt="" hidden>
    </label>
  `;
}

function renderRecordTable(records) {
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Mileage</th>
            <th>Workshop</th>
            <th>Tasks</th>
            <th>Cost</th>
            <th>Proof</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${records.map((record) => `
            <tr>
              <td>${formatDate(record.date)}</td>
              <td>${formatKm(record.mileage)}<br><span class="muted">${record.mileageSource === "dashboard-photo" ? "Dash photo" : "Manual"}</span></td>
              <td><strong>${escapeHtml(record.workshop || "Not recorded")}</strong><br><span class="muted">${escapeHtml(record.notes || "")}</span></td>
              <td>${renderRecordLineItems(record)}</td>
              <td>${getRecordCost(record) ? formatMoney(getRecordCost(record)) : "Not set"}${record.itemized ? `<br><span class="muted">Itemized</span>` : ""}</td>
              <td>${renderProofStrip(record)}</td>
              <td><button class="button small danger" data-action="delete-record" data-id="${escapeAttr(record.id)}">Delete</button></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderRecordLineItems(record) {
  const items = getRecordLineItems(record);
  return `
    <div class="line-items">
      ${items.map((item) => `
        <div class="line-item">
          <span>${escapeHtml(item.name)}</span>
          ${item.cost ? `<strong>${formatMoney(item.cost)}</strong>` : ""}
        </div>
      `).join("")}
    </div>
  `;
}

function renderProofStrip(record) {
  const receipt = record.attachments?.receipt;
  const dashboard = record.attachments?.dashboard;
  if (!receipt?.dataUrl && !dashboard?.dataUrl) return `<span class="muted">No photos</span>`;

  return `
    <div class="proof-strip">
      ${receipt?.dataUrl ? `
        <a class="proof-thumb" href="${escapeAttr(receipt.dataUrl)}" target="_blank" rel="noreferrer" title="Receipt photo">
          <img src="${escapeAttr(receipt.dataUrl)}" alt="">
          <span>Receipt</span>
        </a>
      ` : ""}
      ${dashboard?.dataUrl ? `
        <a class="proof-thumb" href="${escapeAttr(dashboard.dataUrl)}" target="_blank" rel="noreferrer" title="Dash photo">
          <img src="${escapeAttr(dashboard.dataUrl)}" alt="">
          <span>${dashboard.mileage ? formatKm(dashboard.mileage) : "Dash"}</span>
        </a>
      ` : ""}
    </div>
  `;
}

function renderForecast() {
  const forecast = getForecast();
  const nextPack = getNextServicePack();

  return `
    <div class="stack">
      <section class="banner">
        <div>
          <strong>Next recommended service: ${nextPack.label}</strong>
          <p>${nextPack.tasks.map((item) => item.name).join(", ") || "No service items are currently due."}</p>
        </div>
        <button class="button primary" data-view="service">Log service</button>
      </section>

      <section class="panel pad">
        <div class="section-title">
          <div>
            <h2>Interval tracker</h2>
            <p>Generated from your profile, current mileage, and service history.</p>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Status</th>
                <th>Task</th>
                <th>Last done</th>
                <th>Next due</th>
                <th>Remaining</th>
                <th>Workshop prep</th>
              </tr>
            </thead>
            <tbody>
              ${forecast.map((item) => `
                <tr>
                  <td><span class="pill ${item.status}">${item.status === "overdue" ? "Overdue" : item.status === "soon" ? "Soon" : "Healthy"}</span></td>
                  <td><strong>${escapeHtml(item.name)}</strong><br><span class="muted">${escapeHtml(item.category)}</span></td>
                  <td>${item.lastRecord ? `${formatDate(item.lastRecord.date)}<br>${formatKm(item.lastRecord.mileage)}` : "Not logged"}</td>
                  <td>${item.nextKm ? formatKm(item.nextKm) : "Date based"}${item.nextDate ? `<br>${formatDate(item.nextDate)}` : ""}</td>
                  <td>${remainingCopy(item)}</td>
                  <td>${escapeHtml(prepCopy(item))}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `;
}

function remainingCopy(item) {
  const parts = [];
  if (item.kmRemaining != null) {
    parts.push(item.kmRemaining <= 0 ? `${formatKm(Math.abs(item.kmRemaining))} overdue` : `${formatKm(item.kmRemaining)} left`);
  }
  if (item.dateRemaining != null) {
    parts.push(item.dateRemaining <= 0 ? `${Math.abs(item.dateRemaining)} days overdue` : `${item.dateRemaining} days left`);
  }
  return parts.join("<br>") || "Monitor by inspection";
}

function prepCopy(item) {
  if (item.status === "overdue") return `Book workshop and ask them to complete ${item.name}.`;
  if (item.status === "soon") return `Plan parts and workshop slot for ${item.name}.`;
  return `No immediate action; verify during routine inspection.`;
}

function renderAssistant() {
  const answer = state.assistantHistory[0]?.answer || buildAssistantAnswer("What needs attention next?");

  return `
    <div class="assistant-layout">
      <section class="panel pad">
        <div class="section-title">
          <div>
            <h2>Maintenance copilot</h2>
            <p>Ask about service timing, resale records, symptoms, and what to request from a workshop.</p>
          </div>
        </div>
        <div class="prompt-row">
          ${["What needs attention next?", "What should I ask the workshop?", "Is my bike ready to sell?", "Explain the oil service"].map((prompt) => `
            <button class="button small" data-action="prompt" data-prompt="${escapeAttr(prompt)}">${prompt}</button>
          `).join("")}
        </div>
        <form class="form-grid" data-form="assistant">
          <label class="field full">
            <span>Your question</span>
            <textarea name="question" placeholder="Example: I am at 18,420 km. What should I do before a long ride?"></textarea>
          </label>
          <div class="form-actions">
            <button class="button primary" type="submit">Ask assistant</button>
          </div>
        </form>
        <div class="answer-box" id="assistant-answer">${answer}</div>
      </section>

      <aside class="panel pad">
        <div class="section-title">
          <div>
            <h3>Grounding data</h3>
            <p>What the assistant can use in this MVP.</p>
          </div>
        </div>
        <div class="priority-list">
          <div class="task-card">
            <div>
              <strong>Selected bike</strong>
              <p>${escapeHtml(state.bike.year)} ${escapeHtml(state.bike.make)} ${escapeHtml(state.bike.model)}, ${formatKm(state.bike.currentMileage)}.</p>
            </div>
            <span class="pill info">Profile</span>
          </div>
          <div class="task-card">
            <div>
              <strong>Manual notes</strong>
              <p>${escapeHtml((state.manualNotes || "No manual notes saved.").slice(0, 220))}</p>
            </div>
            <span class="pill info">Manual</span>
          </div>
          <div class="task-card">
            <div>
              <strong>Service records</strong>
              <p>${state.serviceRecords.length} logged workshop visit${state.serviceRecords.length === 1 ? "" : "s"}.</p>
            </div>
            <span class="pill info">History</span>
          </div>
        </div>
      </aside>
    </div>
  `;
}

function buildAssistantAnswer(question) {
  const lower = question.toLowerCase();
  const forecast = getForecast();
  const health = getHealth();
  const nextPack = getNextServicePack();
  const urgent = forecast.filter((item) => item.status === "overdue");
  const soon = forecast.filter((item) => item.status === "soon");
  const oil = forecast.find((item) => item.name.toLowerCase().includes("oil"));
  const chain = forecast.find((item) => item.name.toLowerCase().includes("chain"));
  const brake = forecast.find((item) => item.name.toLowerCase().includes("brake"));
  let focus = [...urgent, ...soon].slice(0, 5);

  if (lower.includes("oil") && oil) focus = [oil];
  if (lower.includes("chain") && chain) focus = [chain];
  if (lower.includes("brake") && brake) focus = [brake];

  if (lower.includes("sell") || lower.includes("transfer") || lower.includes("owner")) {
    return `
      <h3>Sale readiness</h3>
      <p>Your ${escapeHtml(state.bike.make)} ${escapeHtml(state.bike.model)} has a health score of ${health.score}/100 with ${state.serviceRecords.length} logged service records.</p>
      <ul>
        <li>Export the JSON ownership package from Transfer so the next owner receives structured records.</li>
        <li>Download the sale report for a human-readable history with workshops, mileage, costs, and notes.</li>
        <li>Before listing, clear overdue items: ${urgent.map((item) => escapeHtml(item.name)).join(", ") || "none currently overdue"}.</li>
      </ul>
    `;
  }

  if (lower.includes("workshop") || lower.includes("ask")) {
    return `
      <h3>Workshop request list</h3>
      <p>Ask the workshop to inspect the forecasted service pack for ${nextPack.label} and record parts, fluid grades, and findings on the invoice.</p>
      <ul>
        ${nextPack.tasks.map((item) => `<li>${escapeHtml(item.name)}: ${escapeHtml(prepCopy(item))}</li>`).join("")}
      </ul>
    `;
  }

  return `
    <h3>Maintenance readout</h3>
    <p>Based on ${formatKm(state.bike.currentMileage)}, the selected ${escapeHtml(state.bike.make)} ${escapeHtml(state.bike.model)} template, and your service logs, the bike is rated ${health.label.toLowerCase()} at ${health.score}/100.</p>
    <ul>
      ${(focus.length ? focus : nextPack.tasks).map((item) => `<li>${escapeHtml(item.name)} is ${item.status}. ${remainingPlain(item)}.</li>`).join("")}
      <li>Manual context: ${escapeHtml((state.manualNotes || "No manual notes saved yet.").slice(0, 180))}</li>
    </ul>
  `;
}

function remainingPlain(item) {
  const parts = [];
  if (item.kmRemaining != null) {
    parts.push(item.kmRemaining <= 0 ? `${formatKm(Math.abs(item.kmRemaining))} overdue` : `${formatKm(item.kmRemaining)} remaining`);
  }
  if (item.dateRemaining != null) {
    parts.push(item.dateRemaining <= 0 ? `${Math.abs(item.dateRemaining)} days overdue` : `${item.dateRemaining} days remaining`);
  }
  return parts.join(" and ") || "monitor by inspection";
}

function renderAccount() {
  if (currentUser) {
    return `
      <div class="stack">
        <section class="panel pad account-summary">
          <div class="section-title">
            <div>
              <h2>${escapeHtml(currentUser.name)}</h2>
              <p>${escapeHtml(currentUser.email)}</p>
            </div>
            <span class="pill good">Signed in</span>
          </div>
          <div class="bike-meta-grid">
            <div>
              <span>Saved motorcycle</span>
              <strong>${escapeHtml(state.bike.year)} ${escapeHtml(state.bike.make)} ${escapeHtml(state.bike.model)}</strong>
            </div>
            <div>
              <span>Service records</span>
              <strong>${state.serviceRecords.length}</strong>
            </div>
            <div>
              <span>Renewal reminders</span>
              <strong>${getRenewalItems().filter((item) => item.status === "soon" || item.status === "overdue").length}</strong>
            </div>
          </div>
          <div class="form-actions account-actions">
            <button class="button" type="button" data-view="motorcycle">Edit bike profile</button>
            <button class="button" type="button" data-action="export-json">Download backup</button>
            <button class="button danger" type="button" data-action="logout-account">Sign out</button>
          </div>
        </section>
      </div>
    `;
  }

  return `
    <div class="account-layout">
      <section class="panel pad">
        <div class="section-title">
          <div>
            <h2>Create rider profile</h2>
            <p>Move the current bike and service history into a local rider account.</p>
          </div>
        </div>
        <form class="form-grid" data-form="register">
          ${field("Name", "name", "", "text")}
          ${field("Email", "email", "", "email")}
          ${field("Passcode", "passcode", "", "password")}
          <div class="form-actions">
            <button class="button primary" type="submit">Create account</button>
          </div>
        </form>
      </section>

      <section class="panel pad">
        <div class="section-title">
          <div>
            <h2>Sign in</h2>
            <p>Load bikes, maintenance history, photos, and renewal dates saved to this browser.</p>
          </div>
        </div>
        <form class="form-grid" data-form="login">
          ${field("Email", "email", "", "email")}
          ${field("Passcode", "passcode", "", "password")}
          <div class="form-actions">
            <button class="button primary" type="submit">Sign in</button>
          </div>
        </form>
      </section>
    </div>
  `;
}

function renderTransfer() {
  const health = getHealth();
  const records = sortedRecords();

  return `
    <div class="stack">
      <section class="grid two">
        <div class="panel pad">
          <div class="section-title">
            <div>
              <h2>Transfer package</h2>
              <p>Export structured data that can be imported into another Motoledger instance.</p>
            </div>
          </div>
          <div class="priority-list">
            <button class="button primary" data-action="export-json">Download ownership package</button>
            <label class="button">
              Import ownership package
              <input type="file" accept="application/json" data-action="import-json" hidden>
            </label>
          </div>
        </div>

        <div class="panel pad">
          <div class="section-title">
            <div>
              <h2>Sale report</h2>
              <p>Create a readable report for a buyer, broker, or workshop.</p>
            </div>
          </div>
          <div class="priority-list">
            <button class="button primary" data-action="download-report">Download sale report</button>
            <button class="button" data-action="copy-summary">Copy listing summary</button>
          </div>
        </div>
      </section>

      <section class="panel pad">
        <div class="section-title">
          <div>
            <h2>Ownership snapshot</h2>
            <p>Preview of what will be shared with the next owner.</p>
          </div>
          <span class="pill ${health.overdue ? "overdue" : "good"}">${health.score}/100</span>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Motorcycle</th>
                <th>Mileage</th>
                <th>Records</th>
                <th>Latest workshop</th>
                <th>Next service</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>${escapeHtml(state.bike.year)} ${escapeHtml(state.bike.make)} ${escapeHtml(state.bike.model)}</strong><br>${escapeHtml(state.bike.plate || "Plate not set")}</td>
                <td>${formatKm(state.bike.currentMileage)}</td>
                <td>${records.length}</td>
                <td>${records[0] ? `${escapeHtml(records[0].workshop || "Not recorded")}<br>${formatDate(records[0].date)}` : "No records"}</td>
                <td>${getNextServicePack().label}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `;
}

function handleNavigation(target) {
  if (!target) return;
  activeView = target;
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

app.addEventListener("click", (event) => {
  const viewButton = event.target.closest("[data-view]");
  if (viewButton) {
    handleNavigation(viewButton.dataset.view);
    return;
  }

  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) return;

  const action = actionButton.dataset.action;
  if (action === "quick-mileage") {
    quickMileage();
  } else if (action === "close-mileage") {
    mileagePanelOpen = false;
    render();
  } else if (action === "edit-bike-profile") {
    motorcycleProfileEditing = true;
    activeView = "motorcycle";
    render();
  } else if (action === "lock-bike-profile") {
    motorcycleProfileEditing = false;
    render();
  } else if (action === "reset-demo") {
    state = structuredClone(starterState);
    motorcycleProfileEditing = false;
    mileagePanelOpen = false;
    saveState();
    render();
    showToast("Demo data restored.");
  } else if (action === "start-fresh") {
    startFresh();
  } else if (action === "delete-record") {
    deleteRecord(actionButton.dataset.id);
  } else if (action === "add-custom-task") {
    addCustomTaskRow(actionButton);
  } else if (action === "remove-custom-task") {
    removeCustomTaskRow(actionButton);
  } else if (action === "insert-bike-prompts") {
    insertBikePrompts(actionButton);
  } else if (action === "use-sample-bike-import") {
    useSampleBikeImport(actionButton);
  } else if (action === "clear-bike-import") {
    clearBikeImport(actionButton);
  } else if (action === "preview-bike-import") {
    previewBikeImport(actionButton);
  } else if (action === "use-sample-bulk-service") {
    useSampleBulkService(actionButton);
  } else if (action === "clear-bulk-service") {
    clearBulkServiceImport(actionButton);
  } else if (action === "preview-bulk-service") {
    previewBulkServiceImport(actionButton);
  } else if (action === "save-bulk-service") {
    saveBulkServiceImport(actionButton);
  } else if (action === "prompt") {
    runAssistant(actionButton.dataset.prompt);
  } else if (action === "export-json") {
    exportJson();
  } else if (action === "download-report") {
    downloadReport();
  } else if (action === "copy-summary") {
    copySummary();
  } else if (action === "logout-account") {
    logoutAccount();
  }
});

app.addEventListener("change", (event) => {
  const target = event.target;
  if (target.matches('select[name="make"]')) {
    const make = target.value;
    const models = getModels(make);
    state.bike.make = make;
    state.bike.model = models[0] || "";
    state.bike.generationId = findGenerationId(make, state.bike.model, state.bike.year, "");
    saveState();
    render();
  }

  if (target.matches('select[name="model"]')) {
    state.bike.model = target.value;
    state.bike.generationId = findGenerationId(state.bike.make, state.bike.model, state.bike.year, "");
    saveState();
    render();
  }

  if (target.matches('input[name="year"]')) {
    state.bike.generationId = findGenerationId(state.bike.make, state.bike.model, target.value, state.bike.generationId);
  }

  if (target.matches('input[name="bikePhoto"]')) {
    handleBikePhotoUpload(target);
    return;
  }

  if (target.matches('[data-action="import-json"]')) {
    importJson(target.files?.[0]);
  }

  if (target.matches('[data-action="toggle-itemized"]')) {
    const form = target.closest("form");
    form?.classList.toggle("is-itemized", target.checked);
    updateItemizedSubtotal(form);
  }

  if (target.matches("[data-preview-target]")) {
    handlePhotoUpload(target);
  }
});

app.addEventListener("input", (event) => {
  const target = event.target;
  if (target.matches("[data-cost-input]")) {
    updateItemizedSubtotal(target.closest("form"));
  }

  if (target.matches('textarea[name="bikeBlob"]')) {
    const form = target.closest("form");
    const preview = form?.querySelector("[data-bike-import-preview]");
    if (preview) preview.innerHTML = renderBikeImportPreview(parseBikeProfileText(target.value));
  }
});

app.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  const formType = form.dataset.form;
  if (formType === "mileage") saveMileage(form);
  if (formType === "bike") saveBike(form);
  if (formType === "bike-import") applyBikeImport(form);
  if (formType === "bulk-service-import") previewBulkServiceImport(form.querySelector('[data-action="preview-bulk-service"]'));
  if (formType === "register") registerAccount(form);
  if (formType === "login") loginAccount(form);
  if (formType === "manual") saveManual(form);
  if (formType === "service") saveService(form);
  if (formType === "assistant") {
    const question = new FormData(form).get("question")?.toString().trim();
    if (question) runAssistant(question);
    form.reset();
  }
});

function registerAccount(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  const name = cleanTextValue(data.name || "");
  const email = normalizeEmail(data.email);
  const passcode = String(data.passcode || "");

  if (!name || !email || passcode.length < 4) {
    showToast("Enter a name, email, and passcode with at least 4 characters.");
    return;
  }

  const accounts = loadAccounts();
  if (accounts[email]) {
    showToast("That rider profile already exists. Sign in instead.");
    return;
  }

  accounts[email] = {
    name,
    email,
    passcode,
    createdAt: new Date().toISOString()
  };
  saveAccounts(accounts);
  localStorage.setItem(getAccountStateKey(email), JSON.stringify(state));
  saveCurrentUser({ name, email });
  state = loadState();
  activeView = "dashboard";
  render();
  showToast("Rider profile created and current garage saved.");
}

function loginAccount(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  const email = normalizeEmail(data.email);
  const passcode = String(data.passcode || "");
  const account = loadAccounts()[email];

  if (!account || account.passcode !== passcode) {
    showToast("Email or passcode was not recognized.");
    return;
  }

  saveCurrentUser({ name: account.name || email, email });
  state = loadState();
  activeView = "dashboard";
  render();
  showToast("Signed in and profile loaded.");
}

function logoutAccount() {
  saveState();
  saveCurrentUser(null);
  state = loadState();
  activeView = "account";
  render();
  showToast("Signed out.");
}

function insertBikePrompts(button) {
  const textarea = button.closest("form")?.querySelector('textarea[name="bikeBlob"]');
  if (!textarea) return;
  textarea.value = [
    "What year, brand, and model is your motorcycle?",
    "What nickname should Motoledger use for it?",
    "What is the current odometer reading?",
    "What is the plate number and VIN / chassis number, if available?",
    "When did you acquire it, and what was the mileage then?",
    "Roughly how many km do you ride each month?",
    "Which currency should service costs use?"
  ].join("\n");
  textarea.focus();
  showToast("Guided prompts inserted.");
}

function useSampleBikeImport(button) {
  const textarea = button.closest("form")?.querySelector('textarea[name="bikeBlob"]');
  if (!textarea) return;
  textarea.value = "2021 Yamaha MT-07 named Daily Rider. Plate ML-7421, VIN / chassis number JYARM32E0MA000123. Current odometer is 18,420 km. Bought on 2024-01-12 at 9,500 km. I ride about 720 km per month and pay service bills in SGD.";
  previewBikeImport(button);
}

function clearBikeImport(button) {
  const form = button.closest("form");
  const textarea = form?.querySelector('textarea[name="bikeBlob"]');
  const preview = form?.querySelector("[data-bike-import-preview]");
  if (textarea) textarea.value = "";
  if (preview) {
    preview.innerHTML = `
      <strong>Detected fields appear here before you apply them.</strong>
      <p class="muted">This local parser acts like the first version of an LLM intake flow. A backend LLM can later replace it with richer extraction and follow-up questions.</p>
    `;
  }
}

function previewBikeImport(button) {
  const form = button.closest("form");
  const text = form?.querySelector('textarea[name="bikeBlob"]')?.value || "";
  const preview = form?.querySelector("[data-bike-import-preview]");
  const parsed = parseBikeProfileText(text);
  if (preview) preview.innerHTML = renderBikeImportPreview(parsed);
}

function applyBikeImport(form) {
  const text = new FormData(form).get("bikeBlob")?.toString() || "";
  const parsed = parseBikeProfileText(text);
  const fields = Object.keys(parsed);

  if (!fields.length) {
    showToast("I could not detect bike details from that text yet.");
    return;
  }

  const make = parsed.make || state.bike.make;
  const models = getModels(make);
  const model = parsed.model && models.includes(parsed.model) ? parsed.model : state.bike.model;
  state.bike = {
    ...state.bike,
    ...parsed,
    make,
    model: models.includes(model) ? model : models[0] || model,
    generationId: findGenerationId(make, models.includes(model) ? model : models[0] || model, parsed.year || state.bike.year, state.bike.generationId)
  };
  saveState();
  render();
  showToast(`Applied ${fields.length} profile field${fields.length === 1 ? "" : "s"}.`);
}

function parseBikeProfileText(text) {
  const parsed = {};
  const source = String(text || "");
  const sourceLower = source.toLowerCase();
  const compactSource = compactMatch(source);

  const modelMatch = findKnownModel(source, compactSource);
  if (modelMatch) {
    parsed.make = modelMatch.make;
    parsed.model = modelMatch.model;
  } else {
    const make = getMakes().find((item) => sourceLower.includes(item.toLowerCase()));
    if (make) {
      parsed.make = make;
      const model = getModels(make).find((item) => compactSource.includes(compactMatch(item)));
      if (model) parsed.model = model;
    }
  }

  const year = source.match(/\b(19[8-9]\d|20[0-3]\d)\b/);
  if (year) parsed.year = year[1];

  const nickname = source.match(/\b(?:nickname|bike name|named|name)\s*(?:is|:|-)?\s*([A-Za-z0-9][A-Za-z0-9 _-]{1,28})/i);
  if (nickname) parsed.nickname = cleanTextValue(nickname[1]);

  const plate = source.match(/\b(?:plate|registration|reg no|license plate)\s*(?:number|no)?\s*(?:is|:|#|-)?\s*([A-Z0-9][A-Z0-9 -]{1,14})/i);
  if (plate) parsed.plate = cleanTextValue(plate[1]).toUpperCase();

  const vin = source.match(/\b(?:vin|chassis)\s*(?:number|no)?\s*(?:is|:|#|-)?\s*([A-HJ-NPR-Z0-9]{11,17})\b/i)
    || source.match(/\b[A-HJ-NPR-Z0-9]{17}\b/i);
  if (vin) parsed.vin = cleanTextValue(vin[1] || vin[0]).toUpperCase();

  const acquiredDate = source.match(/\b(?:bought|purchased|acquired|owner since|owned since)\D{0,24}(\d{4}-\d{1,2}-\d{1,2}|\d{1,2}[/-]\d{1,2}[/-]\d{2,4})/i);
  if (acquiredDate) parsed.acquiredDate = toDateInput(acquiredDate[1]);

  const baselineMileage = source.match(/\b(?:bought|purchased|acquired|baseline|starting)[^\n.]{0,80}?(?:at|with|mileage|odometer|odo)\D{0,12}(\d[\d,.]*)\s*(?:km|kilometers|kilometres|miles)?/i);
  if (baselineMileage) {
    const value = parseMileageNumber(baselineMileage[1]);
    if (value) parsed.baselineMileage = value;
  }

  const currentMileage = source.match(/\b(?:current\s*)?(?:odometer|odo|mileage|miles)\D{0,30}(\d[\d,.]*)\s*(?:km|kilometers|kilometres|miles)?/i);
  if (currentMileage) {
    const value = parseMileageNumber(currentMileage[1]);
    if (value) parsed.currentMileage = value;
  }

  const monthlyMileage = source.match(/\b(?:monthly|per month|each month|a month)\D{0,30}(\d[\d,.]*)\s*(?:km|kilometers|kilometres|miles)?/i)
    || source.match(/\b(\d[\d,.]*)\s*(?:km|kilometers|kilometres|miles)\s*(?:per|each|a)?\s*month\b/i);
  if (monthlyMileage) {
    const value = parseMileageNumber(monthlyMileage[1]);
    if (value) parsed.monthlyMileage = value;
  }

  const currency = source.match(/\b(SGD|USD|MYR|IDR|THB|PHP|EUR|GBP|AUD|JPY)\b/i);
  if (currency) parsed.currency = currency[1].toUpperCase();

  return parsed;
}

function renderBikeImportPreview(parsed) {
  const labels = {
    nickname: "Nickname",
    make: "Brand",
    model: "Model",
    year: "Year",
    plate: "Plate",
    vin: "VIN / Chassis number",
    acquiredDate: "Acquired date",
    baselineMileage: "Mileage at acquisition",
    currentMileage: "Current mileage",
    monthlyMileage: "Monthly mileage",
    currency: "Currency"
  };
  const entries = Object.entries(parsed);

  if (!entries.length) {
    return `
      <strong>No fields detected yet.</strong>
      <p class="muted">Try including the year, make, model, odometer, plate, VIN / chassis number, acquisition date, acquisition mileage, monthly mileage, or currency.</p>
    `;
  }

  return `
    <strong>${entries.length} field${entries.length === 1 ? "" : "s"} detected</strong>
    <div class="detected-grid">
      ${entries.map(([key, value]) => `
        <div>
          <span>${labels[key] || key}</span>
          <strong>${escapeHtml(key.toLowerCase().includes("mileage") ? formatKm(value) : value)}</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function findKnownModel(source, compactSource) {
  for (const make of getMakes()) {
    for (const model of getModels(make)) {
      if (source.toLowerCase().includes(model.toLowerCase()) || compactSource.includes(compactMatch(model))) {
        return { make, model };
      }
    }
  }
  return null;
}

function compactMatch(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function cleanTextValue(value) {
  return String(value || "").replace(/[.,;]+$/g, "").trim();
}

function parseMileageNumber(value) {
  return Math.max(0, Math.round(Number(String(value || "").replace(/,/g, "")) || 0));
}

function toDateInput(value) {
  const raw = String(value || "").trim();
  if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(raw)) {
    const [year, month, day] = raw.split("-");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
  const parts = raw.split(/[/-]/);
  if (parts.length === 3) {
    const [first, second, third] = parts;
    const year = third.length === 2 ? `20${third}` : third;
    return `${year}-${second.padStart(2, "0")}-${first.padStart(2, "0")}`;
  }
  return raw;
}

function saveBike(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  const currentModels = getModels(data.make);
  const selectedModel = currentModels.includes(data.model) ? data.model : currentModels[0] || data.model;
  state.bike = {
    ...state.bike,
    nickname: data.nickname || "My motorcycle",
    make: data.make,
    model: selectedModel,
    year: data.year || "",
    plate: data.plate || "",
    vin: data.vin || "",
    acquiredDate: data.acquiredDate || "",
    baselineMileage: Number(data.baselineMileage || 0),
    currentMileage: Number(data.currentMileage || 0),
    monthlyMileage: Number(data.monthlyMileage || 0),
    currency: (data.currency || "USD").toUpperCase(),
    generationId: findGenerationId(data.make, selectedModel, data.year, data.generationId),
    roadTaxRenewalDate: data.roadTaxRenewalDate || "",
    insuranceRenewalDate: data.insuranceRenewalDate || "",
    coeRenewalDate: data.coeRenewalDate || ""
  };
  motorcycleProfileEditing = false;
  saveState();
  render();
  showToast("Motorcycle profile saved.");
}

function saveMileage(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  const mileage = Number(data.currentMileageUpdate || 0);

  if (!Number.isFinite(mileage) || mileage < 0) {
    showToast("Mileage must be a positive number.");
    return;
  }

  state.bike.currentMileage = Math.round(mileage);
  state.bike.lastMileageUpdateDate = data.mileageUpdateDate || todayIso();
  state.bike.lastMileageUpdateNote = cleanTextValue(data.mileageUpdateNote || "Manual odometer update");
  mileagePanelOpen = false;
  saveState();
  render();
  showToast("Mileage updated.");
}

function saveManual(form) {
  state.manualNotes = new FormData(form).get("manualNotes")?.toString() || "";
  saveState();
  render();
  showToast("Manual notes saved.");
}

function useSampleBulkService(button) {
  const form = button.closest("form");
  const textarea = form?.querySelector('textarea[name="bulkServiceText"]');
  if (!textarea) return;
  textarea.value = [
    "2025-09-10, 15120 km, Apex Moto Works. Engine oil and filter SGD118, brake inspection SGD28, chain clean SGD22. Total SGD168. Notes: Motul 10W-40, OEM filter, chain adjusted.",
    "",
    "2026-02-18 @ 17180 km - Northside Garage - Chain lubrication SGD22; tyre and chassis inspection SGD20. Paid SGD42. Notes: Rear tyre at 45 percent. Front pads healthy.",
    "",
    "18 Jun 2026, 18420km, Urban Moto Lab. Battery health check SGD35, oil change SGD120. Total SGD155."
  ].join("\n");
  previewBulkServiceImport(button);
}

function clearBulkServiceImport(button) {
  const form = button.closest("form");
  const textarea = form?.querySelector('textarea[name="bulkServiceText"]');
  const preview = form?.querySelector("[data-bulk-service-preview]");
  if (textarea) textarea.value = "";
  if (preview) {
    preview.className = "bulk-preview empty";
    preview.textContent = "Paste one or many service entries, then generate editable drafts.";
  }
}

function previewBulkServiceImport(button) {
  const form = button.closest("form");
  const textarea = form?.querySelector('textarea[name="bulkServiceText"]');
  const preview = form?.querySelector("[data-bulk-service-preview]");
  if (!textarea || !preview) return;

  const drafts = parseBulkServiceText(textarea.value);
  preview.className = drafts.length ? "bulk-preview" : "bulk-preview empty";
  preview.innerHTML = renderBulkServiceDrafts(drafts);
  showToast(drafts.length ? `${drafts.length} draft record${drafts.length === 1 ? "" : "s"} generated.` : "No service records detected yet.");
}

function saveBulkServiceImport(button) {
  const form = button.closest("form");
  const preview = form?.querySelector("[data-bulk-service-preview]");
  const records = collectBulkPreviewRecords(preview);

  if (!records.length) {
    showToast("No confirmed draft records to save.");
    return;
  }

  state.serviceRecords = [...records, ...state.serviceRecords];
  const maxMileage = Math.max(...records.map((record) => Number(record.mileage || 0)));
  if (maxMileage > Number(state.bike.currentMileage || 0)) state.bike.currentMileage = maxMileage;
  saveState();
  render();
  showToast(`${records.length} service record${records.length === 1 ? "" : "s"} imported.`);
}

function parseBulkServiceText(text) {
  const blocks = splitBulkServiceBlocks(text);
  return blocks
    .map((block, index) => parseBulkServiceBlock(block, index))
    .filter((draft) => draft.workshop || draft.mileage || draft.cost || draft.lineItems.length || draft.notes);
}

function splitBulkServiceBlocks(text) {
  const normalized = String(text || "").replace(/\r/g, "").trim();
  if (!normalized) return [];

  const paragraphBlocks = normalized.split(/\n\s*\n+/).map((block) => block.trim()).filter(Boolean);
  if (paragraphBlocks.length > 1) return paragraphBlocks;

  const lines = normalized.split("\n").map((line) => line.trim()).filter(Boolean);
  const blocks = [];
  let current = [];

  lines.forEach((line) => {
    if (current.length && hasDateSignal(line)) {
      blocks.push(current.join(" "));
      current = [line];
    } else {
      current.push(line);
    }
  });

  if (current.length) blocks.push(current.join(" "));
  return blocks.length ? blocks : [normalized];
}

function parseBulkServiceBlock(block, index) {
  const date = parseFlexibleDateFromText(block) || todayIso();
  const mileage = parseMileageFromText(block) || Number(state.bike.currentMileage || 0);
  const cost = parseCostFromText(block);
  const workshop = parseBulkWorkshop(block);
  const lineItems = parseBulkLineItems(block, cost);
  const notes = parseBulkNotes(block);

  return {
    id: `draft-${Date.now()}-${index}`,
    date,
    mileage,
    workshop,
    cost,
    lineItems,
    notes,
    source: block
  };
}

function renderBulkServiceDrafts(drafts) {
  if (!drafts.length) {
    return "No records detected. Include dates, mileage, workshop names, tasks, and amounts where possible.";
  }

  return `
    <div class="bulk-preview-head">
      <strong>${drafts.length} editable draft${drafts.length === 1 ? "" : "s"}</strong>
      <span class="muted">Untick any row you do not want to save.</span>
    </div>
    <div class="bulk-draft-list">
      ${drafts.map((draft, index) => renderBulkServiceDraft(draft, index)).join("")}
    </div>
  `;
}

function renderBulkServiceDraft(draft, index) {
  return `
    <article class="bulk-draft" data-bulk-draft>
      <label class="toggle-line">
        <input type="checkbox" name="bulkInclude" checked>
        <span>Import record ${index + 1}</span>
      </label>
      <div class="bulk-draft-grid">
        <label class="field">
          <span>Date</span>
          <input name="bulkDate" type="date" value="${escapeAttr(draft.date)}">
        </label>
        <label class="field">
          <span>Mileage</span>
          <input name="bulkMileage" type="number" value="${escapeAttr(draft.mileage || "")}">
        </label>
        <label class="field">
          <span>Workshop</span>
          <input name="bulkWorkshop" type="text" value="${escapeAttr(draft.workshop || "")}">
        </label>
        <label class="field">
          <span>Total</span>
          <input name="bulkCost" type="number" min="0" step="0.01" value="${escapeAttr(draft.cost || "")}">
        </label>
      </div>
      <label class="field full">
        <span>Line items</span>
        <textarea name="bulkLineItems">${escapeHtml(lineItemsToBulkText(draft.lineItems))}</textarea>
      </label>
      <label class="field full">
        <span>Notes</span>
        <textarea name="bulkNotes">${escapeHtml(draft.notes || "")}</textarea>
      </label>
    </article>
  `;
}

function collectBulkPreviewRecords(preview) {
  if (!preview) return [];
  return Array.from(preview.querySelectorAll("[data-bulk-draft]"))
    .filter((draftElement) => draftElement.querySelector('input[name="bulkInclude"]')?.checked)
    .map((draftElement, index) => {
      const date = draftElement.querySelector('input[name="bulkDate"]')?.value || todayIso();
      const mileage = Number(draftElement.querySelector('input[name="bulkMileage"]')?.value || state.bike.currentMileage || 0);
      const workshop = draftElement.querySelector('input[name="bulkWorkshop"]')?.value.trim() || "Workshop not recorded";
      const invoiceTotal = Number(draftElement.querySelector('input[name="bulkCost"]')?.value || 0);
      const lineItems = parseBulkLineItemsText(draftElement.querySelector('textarea[name="bulkLineItems"]')?.value || "");
      const itemizedTotal = lineItems.reduce((sum, item) => sum + Number(item.cost || 0), 0);
      const notes = draftElement.querySelector('textarea[name="bulkNotes"]')?.value.trim() || "";
      const finalItems = lineItems.length ? lineItems : [{ name: "General service", type: "custom", cost: 0 }];

      return normalizeServiceRecord({
        id: `rec-${Date.now()}-${index}`,
        date,
        mileage,
        mileageSource: "bulk-import",
        workshop,
        tasks: finalItems.map((item) => item.name),
        taskItems: finalItems,
        itemized: itemizedTotal > 0,
        itemizedTotal,
        invoiceTotal,
        cost: itemizedTotal || invoiceTotal,
        attachments: {},
        notes
      });
    });
}

function parseBulkLineItems(block, totalCost) {
  const items = [];
  const segments = String(block || "")
    .split(/[\n;]+|,(?=\s*[A-Za-z])/)
    .map((segment) => segment.trim())
    .filter(Boolean);

  segments.forEach((segment) => {
    if (isMostlySummarySegment(segment)) return;
    const taskSignals = parseTaskSignals(segment);
    const cost = parseLineItemCostFromText(segment);
    const taskNames = [...taskSignals.taskNames, ...taskSignals.customTasks];

    taskNames.forEach((taskName) => {
      addLineItem(items, taskName, cost, taskSignals.taskNames.includes(taskName) ? "template" : "custom");
    });
  });

  if (!items.length) {
    const taskSignals = parseTaskSignals(block);
    [...taskSignals.taskNames, ...taskSignals.customTasks].forEach((taskName) => {
      addLineItem(items, taskName, 0, taskSignals.taskNames.includes(taskName) ? "template" : "custom");
    });
  }

  if (items.length === 1 && totalCost && !items[0].cost) items[0].cost = totalCost;
  return items;
}

function parseBulkLineItemsText(text) {
  return String(text || "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const explicitParts = line.split("|");
      const rawName = explicitParts.length > 1 ? explicitParts[0] : line.replace(/\b(?:sgd|usd|myr|eur|gbp|aud|thb|php|jpy|\$)?\s*[0-9]+(?:[.][0-9]{1,2})?\b/ig, "");
      const cost = explicitParts.length > 1 ? Number(explicitParts[1].replace(/[^0-9.]/g, "")) : parseCostFromText(line);
      const matchedTask = matchTemplateTaskName(rawName) || parseTaskSignals(rawName).taskNames[0];
      const name = cleanTextValue(matchedTask || rawName.replace(/[-:]+$/g, ""));
      if (!name) return null;
      return {
        name,
        type: matchedTask ? "template" : "custom",
        cost: Number(cost || 0)
      };
    })
    .filter(Boolean);
}

function lineItemsToBulkText(lineItems) {
  return (lineItems.length ? lineItems : [{ name: "General service", cost: 0 }])
    .map((item) => `${item.name}${item.cost ? ` | ${item.cost}` : ""}`)
    .join("\n");
}

function addLineItem(items, name, cost, type) {
  const existing = items.find((item) => item.name.toLowerCase() === name.toLowerCase());
  if (existing) {
    if (!existing.cost && cost) existing.cost = cost;
    return;
  }
  items.push({ name, type, cost: Number(cost || 0) });
}

function parseBulkWorkshop(block) {
  const text = String(block || "");
  const labelled = text.match(/\b(?:workshop|garage|shop|dealer|mechanic|by|at)\s*(?:is|:|-)?\s*([A-Za-z0-9&.' -]{3,44})/i);
  if (labelled) {
    const cleaned = cleanWorkshopName(labelled[1]);
    if (cleaned) return cleaned;
  }

  const afterMileage = text.match(/\b\d{4,7}\s*(?:km|kms|kilometers|kilometres)\b\s*[-,@ ]+\s*([A-Za-z0-9&.' -]{3,44})/i);
  if (afterMileage) return cleanWorkshopName(afterMileage[1]);

  const beforeColon = text.match(/^[^-:,.\n]{3,44}(?=:)/);
  if (beforeColon) return cleanWorkshopName(beforeColon[0]);

  return "";
}

function cleanWorkshopName(value) {
  return cleanTextValue(String(value || "")
    .split(/\b(?:oil|engine|chain|brake|tyre|tire|battery|coolant|spark|total|paid|notes?)\b/i)[0]
    .replace(/\b\d{4,7}\s*(?:km|kms)?\b/ig, "")
    .replace(/\b(?:on|at|for)\b$/i, "")
    .replace(/[-. ]+$/g, ""))
    .replace(/\s+/g, " ");
}

function parseBulkNotes(block) {
  const notes = String(block || "").match(/\bnotes?\s*[:=-]\s*(.+)$/i);
  if (notes) return cleanTextValue(notes[1]);
  return "";
}

function isMostlySummarySegment(segment) {
  return /\b(?:total|amount|paid|invoice|bill|receipt)\b/i.test(segment)
    && !/\b(?:oil|chain|brake|tyre|tire|battery|coolant|spark|filter|valve|clutch|fork)\b/i.test(segment);
}

function hasDateSignal(text) {
  return Boolean(parseFlexibleDateFromText(text));
}

function matchTemplateTaskName(name) {
  const compactName = compactMatch(name);
  return getTemplate().find((item) => {
    const compactTask = compactMatch(item.name);
    return compactName === compactTask || compactName.includes(compactTask) || compactTask.includes(compactName);
  })?.name || "";
}

async function saveService(form) {
  try {
    const formData = new FormData(form);
    const itemized = formData.get("itemizeCosts") === "on";
    const lineItems = collectServiceLineItems(form, itemized);

    if (!lineItems.length) {
      showToast("Choose at least one task or add a custom item.");
      return;
    }

    const invoiceTotal = Number(formData.get("cost") || 0);
    const itemizedTotal = lineItems.reduce((sum, item) => sum + Number(item.cost || 0), 0);
    const photoMileage = Number(formData.get("photoMileage") || 0);
    const manualMileage = Number(formData.get("mileage") || state.bike.currentMileage || 0);
    const mileage = photoMileage || manualMileage;
    const receiptFile = form.querySelector('input[name="receiptPhoto"]')?.files?.[0];
    const dashboardFile = form.querySelector('input[name="dashboardPhoto"]')?.files?.[0];
    const receipt = await readImageAttachment(receiptFile, "Invoice / receipt photo");
    const dashboard = await readImageAttachment(dashboardFile, "Dash photo", { mileage: photoMileage || mileage });
    const tasks = [...new Set(lineItems.map((item) => item.name))];
    const record = {
      id: `rec-${Date.now()}`,
      date: formData.get("date")?.toString() || todayIso(),
      mileage,
      mileageSource: dashboard || photoMileage ? "dashboard-photo" : "manual",
      workshop: formData.get("workshop")?.toString().trim() || "Workshop not recorded",
      tasks,
      taskItems: lineItems,
      itemized,
      itemizedTotal,
      invoiceTotal,
      cost: itemized && itemizedTotal ? itemizedTotal : invoiceTotal,
      attachments: {
        receipt: receipt || null,
        dashboard: dashboard || null
      },
      notes: formData.get("notes")?.toString().trim() || ""
    };

    state.serviceRecords = [record, ...state.serviceRecords];
    if (mileage > Number(state.bike.currentMileage || 0)) state.bike.currentMileage = mileage;
    saveState();
    form.reset();
    render();
    showToast("Service record saved.");
  } catch (error) {
    showToast("Could not save this service record. Try smaller photos or fewer attachments.");
  }
}

function collectServiceLineItems(form, itemized) {
  const items = [];
  form.querySelectorAll("[data-service-task-row]").forEach((row) => {
    const checkbox = row.querySelector('input[name="tasks"]');
    if (!checkbox?.checked) return;
    const cost = itemized ? Number(row.querySelector('input[name="taskCosts"]')?.value || 0) : 0;
    items.push({ name: checkbox.value, type: "template", cost });
  });

  form.querySelectorAll("[data-custom-task-row]").forEach((row) => {
    const name = cleanTextValue(row.querySelector('input[name="customTaskNames"]')?.value || "");
    if (!name) return;
    const cost = itemized ? Number(row.querySelector('input[name="customTaskCosts"]')?.value || 0) : 0;
    items.push({ name, type: "custom", cost });
  });

  return items;
}

function addCustomTaskRow(button) {
  const list = button.closest("form")?.querySelector("[data-custom-task-list]");
  if (!list) return;
  list.insertAdjacentHTML("beforeend", renderCustomTaskRow());
  updateItemizedSubtotal(button.closest("form"));
}

function removeCustomTaskRow(button) {
  const row = button.closest("[data-custom-task-row]");
  const form = button.closest("form");
  const rows = form?.querySelectorAll("[data-custom-task-row]") || [];
  if (rows.length <= 1) {
    row?.querySelector('input[name="customTaskNames"]')?.focus();
    row?.querySelector('input[name="customTaskNames"]') && (row.querySelector('input[name="customTaskNames"]').value = "");
    row?.querySelector('input[name="customTaskCosts"]') && (row.querySelector('input[name="customTaskCosts"]').value = "");
  } else {
    row?.remove();
  }
  updateItemizedSubtotal(form);
}

function updateItemizedSubtotal(form) {
  if (!form) return;
  const subtotal = collectServiceLineItems(form, true).reduce((sum, item) => sum + Number(item.cost || 0), 0);
  const target = form.querySelector("[data-itemized-subtotal]");
  if (target) target.textContent = formatMoney(subtotal);
}

async function handleBikePhotoUpload(input) {
  previewImageInput(input);
  const file = input.files?.[0];
  if (!file) return;

  try {
    const attachment = await readImageAttachment(file, "Motorcycle photo");
    if (!attachment) return;
    state.bike.photoDataUrl = attachment.dataUrl;
    state.bike.photoName = attachment.fileName;
    saveState();
    showToast("Motorcycle photo saved to profile.");
  } catch (error) {
    showToast("Could not save that motorcycle photo. Try a smaller image.");
  }
}

async function handlePhotoUpload(input) {
  previewImageInput(input);
  const file = input.files?.[0];
  const form = input.closest("form");
  if (!file || !form) return;

  const extraction = extractServicePhotoFields(file, input.name);
  applyServicePhotoExtraction(form, extraction);
  renderServicePhotoExtraction(form, extraction);

  if (extraction.applied.length) {
    showToast(`${input.name === "dashboardPhoto" ? "Dash" : "Invoice"} photo auto-filled ${extraction.applied.length} field${extraction.applied.length === 1 ? "" : "s"}.`);
  } else {
    showToast("Photo attached. No readable field hints found yet.");
  }
}

function previewImageInput(input) {
  const preview = input.closest("form")?.querySelector(`[data-preview="${input.dataset.previewTarget}"]`);
  const file = input.files?.[0];
  if (!preview || !file) return;
  const reader = new FileReader();
  reader.onload = () => {
    preview.src = String(reader.result || "");
    preview.hidden = false;
  };
  reader.readAsDataURL(file);
}

function extractServicePhotoFields(file, inputName) {
  const kind = inputName === "dashboardPhoto" ? "dashboard" : "receipt";
  const fileName = file?.name || "";
  const text = normalizeFileName(fileName);
  const detected = {
    kind,
    source: fileName,
    fields: {},
    applied: [],
    taskNames: [],
    customTasks: []
  };

  const date = parseDateFromText(text);
  if (date) detected.fields.date = date;

  let mileage = parseMileageFromText(text);
  if (!mileage && kind === "dashboard") mileage = parsePlainMileageFromText(text);
  if (mileage) detected.fields.mileage = mileage;

  if (kind === "receipt") {
    const cost = parseCostFromText(text);
    if (cost) detected.fields.cost = cost;

    const workshop = parseWorkshopFromFileName(text);
    if (workshop) detected.fields.workshop = workshop;

    const taskSignals = parseTaskSignals(text);
    detected.taskNames = taskSignals.taskNames;
    detected.customTasks = taskSignals.customTasks;
  }

  if (!detected.fields.date && file?.lastModified) {
    const modifiedDate = new Date(file.lastModified);
    if (!Number.isNaN(modifiedDate.getTime())) detected.fields.photoDate = modifiedDate.toISOString().slice(0, 10);
  }

  return detected;
}

function applyServicePhotoExtraction(form, extraction) {
  if (!form || !extraction) return;
  const fields = extraction.fields;

  if (fields.date && setInputValue(form, "date", fields.date, true)) {
    extraction.applied.push(["Date", formatDate(fields.date)]);
  }

  if (fields.cost && extraction.kind === "receipt" && setInputValue(form, "cost", fields.cost, false)) {
    extraction.applied.push(["Invoice total", formatMoney(fields.cost)]);
  }

  if (fields.workshop && extraction.kind === "receipt" && setInputValue(form, "workshop", fields.workshop, false)) {
    extraction.applied.push(["Workshop", fields.workshop]);
  }

  if (fields.mileage && extraction.kind === "dashboard") {
    const photoMileageSet = setInputValue(form, "photoMileage", fields.mileage, true);
    const mileageSet = setInputValue(form, "mileage", fields.mileage, true);
    if (photoMileageSet || mileageSet) extraction.applied.push(["Dash mileage", formatKm(fields.mileage)]);
  }

  if (fields.mileage && extraction.kind === "receipt") {
    if (setInputValue(form, "mileage", fields.mileage, false)) {
      extraction.applied.push(["Odometer reading", formatKm(fields.mileage)]);
    }
  }

  extraction.taskNames.forEach((taskName) => {
    const checkbox = findTaskCheckbox(form, taskName);
    if (checkbox && !checkbox.checked) {
      checkbox.checked = true;
      extraction.applied.push(["Task", taskName]);
    }
  });

  extraction.customTasks.forEach((taskName) => {
    if (ensureCustomTask(form, taskName)) extraction.applied.push(["Custom item", taskName]);
  });

  updateItemizedSubtotal(form);
}

function renderServicePhotoExtraction(form, extraction) {
  const target = form?.querySelector("[data-photo-extraction]");
  if (!target || !extraction) return;
  const readableSource = extraction.kind === "dashboard" ? "Dash photo" : "Invoice photo";

  if (!extraction.applied.length) {
    target.innerHTML = `
      <strong>${readableSource} attached</strong>
      <p class="muted">No fields could be auto-filled from the filename. Rename photos with hints like <code>dash-18420km.jpg</code> or <code>apex-invoice-sgd168-oil-chain.jpg</code>, or connect OCR/LLM extraction later.</p>
    `;
    return;
  }

  target.innerHTML = `
    <strong>${readableSource} auto-filled</strong>
    <div class="detected-grid photo-detected-grid">
      ${extraction.applied.map(([label, value]) => `
        <div>
          <span>${escapeHtml(label)}</span>
          <strong>${escapeHtml(value)}</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function setInputValue(form, name, value, overwrite) {
  const input = form.querySelector(`[name="${name}"]`);
  if (!input) return false;
  if (!overwrite && input.value.trim()) return false;
  input.value = value;
  input.dispatchEvent(new Event("input", { bubbles: true }));
  return true;
}

function findTaskCheckbox(form, taskName) {
  return Array.from(form.querySelectorAll('input[name="tasks"]')).find((checkbox) => checkbox.value === taskName);
}

function ensureCustomTask(form, taskName) {
  const existing = Array.from(form.querySelectorAll('input[name="customTaskNames"]'))
    .some((input) => input.value.trim().toLowerCase() === taskName.toLowerCase());
  if (existing) return false;

  const emptyInput = Array.from(form.querySelectorAll('input[name="customTaskNames"]'))
    .find((input) => !input.value.trim());
  if (emptyInput) {
    emptyInput.value = taskName;
    return true;
  }

  const list = form.querySelector("[data-custom-task-list]");
  if (!list) return false;
  list.insertAdjacentHTML("beforeend", renderCustomTaskRow(taskName));
  return true;
}

function normalizeFileName(fileName) {
  return String(fileName || "")
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[_+]+/g, " ")
    .replace(/[-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseDateFromText(text) {
  const iso = text.match(/\b(20\d{2})[ .-](\d{1,2})[ .-](\d{1,2})\b/);
  if (iso) return `${iso[1]}-${iso[2].padStart(2, "0")}-${iso[3].padStart(2, "0")}`;

  const local = text.match(/\b(\d{1,2})[ .-](\d{1,2})[ .-](20\d{2})\b/);
  if (local) return `${local[3]}-${local[2].padStart(2, "0")}-${local[1].padStart(2, "0")}`;

  return null;
}

function parseMileageFromText(text) {
  const patterns = [
    /\b(?:odo|odometer|mileage|dash|km)\D{0,16}(\d{4,7})\b/i,
    /\b(\d{4,7})\s*(?:km|kms|kilometers|kilometres)\b/i
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return parseMileageNumber(match[1]);
  }
  return 0;
}

function parsePlainMileageFromText(text) {
  const numbers = [...String(text || "").matchAll(/\b(\d{4,7})\b/g)]
    .map((match) => parseMileageNumber(match[1]))
    .filter((value) => value >= 1000);
  return numbers.length ? numbers[numbers.length - 1] : 0;
}

function parseCostFromText(text) {
  const patterns = [
    /\b(?:total|amount|invoice|paid|bill|cost)\D{0,14}([1-9]\d{0,4}(?:[.]\d{1,2})?)\b/i,
    /\b(?:sgd|usd|myr|eur|gbp|aud|thb|php|jpy|\$)\s*([1-9]\d{0,4}(?:[.]\d{1,2})?)\b/i,
    /\b([1-9]\d{0,4}(?:[.]\d{1,2})?)\s*(?:sgd|usd|myr|eur|gbp|aud|thb|php|jpy)\b/i
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return Number(match[1]);
  }
  return 0;
}

function parseLineItemCostFromText(text) {
  const itemText = String(text || "").split(/\b(?:total|amount|invoice|paid|bill|receipt|notes?)\b/i)[0];
  const patterns = [
    /\b(?:sgd|usd|myr|eur|gbp|aud|thb|php|jpy|\$)\s*([1-9]\d{0,4}(?:[.]\d{1,2})?)\b/i,
    /\b([1-9]\d{0,4}(?:[.]\d{1,2})?)\s*(?:sgd|usd|myr|eur|gbp|aud|thb|php|jpy)\b/i,
    /\b(?:cost|price)\D{0,8}([1-9]\d{0,4}(?:[.]\d{1,2})?)\b/i
  ];
  for (const pattern of patterns) {
    const match = itemText.match(pattern);
    if (match) return Number(match[1]);
  }
  return 0;
}

function parseWorkshopFromFileName(text) {
  const lower = text.toLowerCase();
  const stopWords = ["invoice", "receipt", "bill", "service", "total", "amount", "paid", "sgd", "usd", "myr", "dash", "odo", "odometer", "mileage", "km", "kms"];
  let candidate = lower.split(/\b(?:invoice|receipt|bill|service)\b/i)[0] || "";
  candidate = candidate
    .split(" ")
    .filter((token) => token && !stopWords.includes(token) && !/^\d/.test(token))
    .slice(0, 5)
    .join(" ");
  if (candidate.length < 3) return "";
  return toTitleCase(candidate);
}

function parseTaskSignals(text) {
  const compact = compactMatch(text);
  const signals = [
    { keys: ["oil", "engineoil", "oilfilter", "oilchange"], task: "Engine oil and filter" },
    { keys: ["chain", "chainslack", "chainlube"], task: "Chain clean, slack, and lubrication" },
    { keys: ["brakefluid"], task: "Brake fluid replacement" },
    { keys: ["brakepad", "brakeinspection", "brakes"], task: "Brake system inspection" },
    { keys: ["airfilter"], task: "Air filter inspection" },
    { keys: ["sparkplug", "sparkplugs"], task: "Spark plug replacement" },
    { keys: ["coolant"], task: "Coolant replacement" },
    { keys: ["valveclearance", "valves"], task: "Valve clearance inspection" },
    { keys: ["tyre", "tire", "wheel", "chassis"], task: "Tyre and chassis inspection" },
    { keys: ["finaldrive"], task: "Final drive oil change" },
    { keys: ["spoke", "spokes"], task: "Spoke and wheel inspection" },
    { keys: ["desmo"], task: "Desmo service inspection" }
  ];
  const templateTasks = getTemplate().map((item) => item.name);
  const taskNames = [];
  const customTasks = [];
  signals.forEach((signal) => {
    if (!signal.keys.some((key) => compact.includes(key))) return;
    const matchingTask = templateTasks.find((name) => name === signal.task || compactMatch(name).includes(compactMatch(signal.task)));
    if (matchingTask && !taskNames.includes(matchingTask)) taskNames.push(matchingTask);
    if (!matchingTask && !customTasks.includes(signal.task)) customTasks.push(signal.task);
  });

  [
    { keys: ["battery"], task: "Battery check" },
    { keys: ["clutch"], task: "Clutch adjustment" },
    { keys: ["forkseal", "forkseals"], task: "Fork seal inspection" },
    { keys: ["tyrereplace", "tirereplace"], task: "Tyre replacement" }
  ].forEach((signal) => {
    if (signal.keys.some((key) => compact.includes(key)) && !customTasks.includes(signal.task)) customTasks.push(signal.task);
  });

  return { taskNames, customTasks };
}

function toTitleCase(value) {
  return String(value || "")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function readImageAttachment(file, label, extra = {}) {
  if (!file || !file.size) return Promise.resolve(null);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const originalDataUrl = String(reader.result || "");
      const image = new Image();
      image.onerror = () => resolve(buildAttachment(file, label, originalDataUrl, extra));
      image.onload = () => {
        const maxSize = 1200;
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
        const width = Math.max(1, Math.round(image.width * scale));
        const height = Math.max(1, Math.round(image.height * scale));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, width, height);
        resolve(buildAttachment(file, label, canvas.toDataURL("image/jpeg", 0.82), extra));
      };
      image.src = originalDataUrl;
    };
    reader.readAsDataURL(file);
  });
}

function buildAttachment(file, label, dataUrl, extra) {
  return {
    label,
    fileName: file.name,
    type: file.type || "image/jpeg",
    originalSize: file.size,
    dataUrl,
    createdAt: new Date().toISOString(),
    ...extra
  };
}

function quickMileage() {
  mileagePanelOpen = true;
  render();
}

function startFresh() {
  const confirmed = window.confirm("Start with a blank motorcycle profile and remove demo service records?");
  if (!confirmed) return;
  motorcycleProfileEditing = false;
  mileagePanelOpen = false;
  state = {
    bike: {
      ...starterState.bike,
      nickname: "My motorcycle",
      plate: "",
      vin: "",
      baselineMileage: 0,
      currentMileage: 0,
      monthlyMileage: 500,
      generationId: findGenerationId(starterState.bike.make, starterState.bike.model, starterState.bike.year, ""),
      roadTaxRenewalDate: "",
      insuranceRenewalDate: "",
      coeRenewalDate: "",
      photoDataUrl: "",
      photoName: ""
    },
    manualNotes: "",
    serviceRecords: [],
    assistantHistory: []
  };
  saveState();
  render();
  showToast("Fresh garage created.");
}

function deleteRecord(id) {
  const confirmed = window.confirm("Delete this service record?");
  if (!confirmed) return;
  state.serviceRecords = state.serviceRecords.filter((record) => record.id !== id);
  saveState();
  render();
  showToast("Service record deleted.");
}

function runAssistant(question) {
  const answer = buildAssistantAnswer(question);
  state.assistantHistory = [{ question, answer, createdAt: new Date().toISOString() }, ...state.assistantHistory].slice(0, 10);
  saveState();
  if (activeView !== "assistant") activeView = "assistant";
  render();
  showToast("Assistant response generated.");
}

function exportJson() {
  const payload = {
    exportedAt: new Date().toISOString(),
    app: "Motoledger",
    version: 1,
    state
  };
  downloadFile(`motoledger-${slugName()}-ownership-package.json`, JSON.stringify(payload, null, 2), "application/json");
  showToast("Ownership package downloaded.");
}

function importJson(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result || "{}"));
      state = normalizeState(parsed.state || parsed);
      saveState();
      activeView = "dashboard";
      render();
      showToast("Ownership package imported.");
    } catch (error) {
      showToast("Could not import that JSON file.");
    }
  };
  reader.readAsText(file);
}

function downloadReport() {
  const report = buildSaleReportHtml();
  downloadFile(`motoledger-${slugName()}-sale-report.html`, report, "text/html");
  showToast("Sale report downloaded.");
}

function copySummary() {
  const health = getHealth();
  const nextPack = getNextServicePack();
  const latest = sortedRecords()[0];
  const summary = `${state.bike.year} ${state.bike.make} ${state.bike.model}, ${formatKm(state.bike.currentMileage)}, ${state.serviceRecords.length} logged service records. Health score ${health.score}/100 (${health.label}). Latest service: ${latest ? `${formatDate(latest.date)} at ${formatKm(latest.mileage)} by ${latest.workshop}` : "not logged"}. Next service: ${nextPack.label}.`;
  navigator.clipboard?.writeText(summary)
    .then(() => showToast("Listing summary copied."))
    .catch(() => showToast(summary));
}

function buildSaleReportHtml() {
  const health = getHealth();
  const forecast = getForecast();
  const records = sortedRecords();
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Motoledger sale report</title>
  <style>
    body { margin: 40px; color: #17211c; font-family: Arial, sans-serif; line-height: 1.45; }
    h1, h2 { margin-bottom: 8px; }
    table { width: 100%; border-collapse: collapse; margin: 18px 0 28px; }
    th, td { padding: 10px; border-bottom: 1px solid #dce4dc; text-align: left; vertical-align: top; }
    th { color: #657267; font-size: 12px; text-transform: uppercase; }
    .pill { display: inline-block; padding: 4px 8px; border-radius: 999px; background: #d9eee5; font-weight: 700; }
  </style>
</head>
<body>
  <h1>${escapeHtml(state.bike.year)} ${escapeHtml(state.bike.make)} ${escapeHtml(state.bike.model)}</h1>
  <p><strong>Plate:</strong> ${escapeHtml(state.bike.plate || "Not set")} | <strong>VIN / Chassis number:</strong> ${escapeHtml(state.bike.vin || "Not set")} | <strong>Mileage:</strong> ${formatKm(state.bike.currentMileage)}</p>
  <p><span class="pill">Health score ${health.score}/100 - ${health.label}</span></p>
  <h2>Service records</h2>
  <table>
    <thead><tr><th>Date</th><th>Mileage</th><th>Workshop</th><th>Line items</th><th>Cost</th><th>Proof</th><th>Notes</th></tr></thead>
    <tbody>
      ${records.map((record) => `<tr><td>${formatDate(record.date)}</td><td>${formatKm(record.mileage)} ${record.mileageSource === "dashboard-photo" ? "(dash photo)" : ""}</td><td>${escapeHtml(record.workshop)}</td><td>${escapeHtml(getRecordLineItemSummary(record))}</td><td>${getRecordCost(record) ? formatMoney(getRecordCost(record)) : ""}</td><td>${record.attachments?.receipt?.dataUrl ? "Receipt photo. " : ""}${record.attachments?.dashboard?.dataUrl ? "Dash photo." : ""}</td><td>${escapeHtml(record.notes || "")}</td></tr>`).join("")}
    </tbody>
  </table>
  <h2>Maintenance forecast</h2>
  <table>
    <thead><tr><th>Status</th><th>Task</th><th>Next due</th><th>Remaining</th></tr></thead>
    <tbody>
      ${forecast.map((item) => `<tr><td>${item.status}</td><td>${escapeHtml(item.name)}</td><td>${item.nextKm ? formatKm(item.nextKm) : "Date based"} ${item.nextDate ? formatDate(item.nextDate) : ""}</td><td>${remainingPlain(item)}</td></tr>`).join("")}
    </tbody>
  </table>
  <h2>Manual notes</h2>
  <p>${escapeHtml(state.manualNotes || "No manual notes saved.")}</p>
</body>
</html>`;
}

function downloadFile(filename, contents, type) {
  const blob = new Blob([contents], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function slugName() {
  return `${state.bike.make}-${state.bike.model}-${state.bike.plate || "bike"}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function showToast(message) {
  clearTimeout(toastTimer);
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  toastTimer = setTimeout(() => toast.remove(), 3200);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}

render();
