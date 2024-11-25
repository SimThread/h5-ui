export default {
    area_data: {
        area_id: {
            1: '港島',
            2: '九龍',
            3: '新界',
            4: '離島'
        },
        district_id: {
            1: '鰂魚涌',
            2: '太古/西灣河',
            3: '筲箕灣',
            4: '柴灣',
            5: '壽臣山',
            6: '淺水灣',
            7: '赤柱/大潭',
            8: '南區/石澳',
            9: '香港仔',
            10: '薄扶林/海怡',
            11: '貝沙灣',
            12: '西半山',
            13: '西區',
            14: '上環/中環',
            15: '中半山/金鐘',
            16: '灣仔',
            17: '銅鑼灣',
            18: '跑馬地',
            19: '天后/大坑',
            20: '北角',
            21: '山頂',
            22: '油塘/藍田',
            23: '觀塘/秀茂坪',
            24: '九龍灣',
            25: '鑽石山/彩虹',
            26: '康城/清水灣',
            27: '將軍澳',
            28: '調景嶺',
            29: '九龍城',
            30: '土瓜灣',
            31: '佐敦/尖沙咀',
            32: '九龍站',
            33: '紅磡/黃埔',
            34: '深水埗',
            35: '長沙灣',
            36: '荔枝角',
            37: '美孚',
            38: '大角咀',
            39: '奧運',
            40: '九龍塘',
            41: '石硤尾',
            42: '何文田/京士柏',
            43: '黃大仙/新蒲崗',
            44: '太子',
            45: '旺角/油麻地',
            46: '西貢',
            47: '馬鞍山',
            48: '大埔/太和',
            49: '沙田/火炭',
            50: '深井',
            51: '荃灣',
            52: '葵涌',
            53: '青衣',
            54: '元朗',
            56: '天水圍',
            57: '屯門',
            58: '粉嶺',
            59: '上水',
            60: '愉景灣',
            61: '東涌',
            62: '馬灣',
            63: '大嶼山',
            64: '坪洲',
            65: '南丫島',
            66: '長洲',
            67: '大窩口',
            68: '珠海',
            69: '深圳',
            70: '東莞',
            71: '惠州',
            72: '廣州',
            73: '澳門',
            74: '台灣',
            75: '日本',
            76: '韓國',
            77: '新加坡',
            78: '馬來西亞',
            79: '泰國',
            80: '英國',
            81: '美國',
            82: '加拿大',
            83: '澳洲',
            84: '中山',
            85: '德國',
            86: '江門',
            87: '海口',
            88: '成都',
            89: '佛山',
            90: '啟德'
        },
        area_district: {
            1: [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                13,
                14,
                15,
                16,
                17,
                18,
                19,
                20,
                21
            ],
            2: [
                22,
                23,
                24,
                25,
                26,
                29,
                30,
                31,
                32,
                33,
                34,
                35,
                36,
                37,
                38,
                39,
                40,
                41,
                42,
                43,
                44,
                45,
                90
            ],
            3: [
                46,
                47,
                48,
                27,
                49,
                50,
                51,
                52,
                53,
                54,
                56,
                57,
                58,
                59,
                28,
                67
            ],
            4: [
                60,
                61,
                62,
                63,
                64,
                65,
                66
            ],
            5: [
                68,
                69,
                70,
                71,
                72,
                84,
                86,
                73,
                74,
                75,
                76,
                77,
                78,
                79,
                80,
                81,
                82,
                83,
                85,
                87,
                88,
                89
            ]
        }
    },
    area_price: [
        {
            value: 0,
            text: '不限'
        },
        {
            value: [
                0,
                10000
            ],
            text: '10000元以下'
        },
        {
            value: [
                10000,
                13000
            ],
            text: '10000-13000元'
        },
        {
            value: [
                13000,
                15000
            ],
            text: '13000-15000元'
        },
        {
            value: [
                15000,
                18000
            ],
            text: '15000-18000元'
        },
        {
            value: [
                18000,
                20000
            ],
            text: '18000-20000元'
        },
        {
            value: [
                20000,
                200000000
            ],
            text: '20000元以上'
        }
    ],
    age_of_building: [
        {
            value: 0,
            text: '不限'
        },
        {
            value: 10,
            text: '10年以內'
        },
        {
            value: 15,
            text: '15年以內'
        },
        {
            value: 20,
            text: '20年以內'
        },
        {
            value: 30,
            text: '30年以內'
        },
        {
            value: 31,
            text: '30年以上'
        }
    ],
    traffic: {
        subway_line_data: {
            1: '港島綫',
            2: '觀塘綫',
            3: '荃灣綫',
            4: '將軍澳綫',
            5: '東涌綫及迪士尼綫',
            6: '東鐵綫',
            7: '馬鞍山綫',
            8: '西鐵綫',
            9: '機場快綫',
            10: '南港島線'
        },
        subway_station_data: {
            1: [
                {
                    name: '堅尼地城',
                    id: 30
                },
                {
                    name: '香港大學',
                    id: 31
                },
                {
                    name: '西營盤',
                    id: 32
                },
                {
                    name: '上環',
                    id: 33
                },
                {
                    name: '中環',
                    id: 34
                },
                {
                    name: '金鐘',
                    id: 35
                },
                {
                    name: '灣仔',
                    id: 36
                },
                {
                    name: '銅鑼灣',
                    id: 37
                },
                {
                    name: '天后',
                    id: 38
                },
                {
                    name: '炮台山',
                    id: 39
                },
                {
                    name: '北角',
                    id: 40
                },
                {
                    name: '鰂魚涌',
                    id: 41
                },
                {
                    name: '太古',
                    id: 42
                },
                {
                    name: '西灣河',
                    id: 43
                },
                {
                    name: '筲箕灣',
                    id: 44
                },
                {
                    name: '杏花邨',
                    id: 45
                },
                {
                    name: '柴灣',
                    id: 46
                },
                {
                    name: '金鐘',
                    id: 47
                }
            ],
            2: [
                {
                    name: '藍田',
                    id: 1
                },
                {
                    name: '觀塘',
                    id: 2
                },
                {
                    name: '牛頭角',
                    id: 3
                },
                {
                    name: '九龍灣',
                    id: 4
                },
                {
                    name: '彩虹',
                    id: 5
                },
                {
                    name: '鑽石山',
                    id: 6
                },
                {
                    name: '黃大仙',
                    id: 7
                },
                {
                    name: '樂富',
                    id: 8
                },
                {
                    name: '九龍塘',
                    id: 9
                },
                {
                    name: '石硤尾',
                    id: 10
                },
                {
                    name: '太子',
                    id: 11
                },
                {
                    name: '旺角',
                    id: 12
                },
                {
                    name: '油麻地',
                    id: 13
                },
                {
                    name: '何文田',
                    id: 14
                },
                {
                    name: '黃埔',
                    id: 15
                },
                {
                    name: '太子',
                    id: 25
                },
                {
                    name: '旺角',
                    id: 26
                },
                {
                    name: '油麻地',
                    id: 27
                },
                {
                    name: '調景嶺',
                    id: 56
                },
                {
                    name: '油塘',
                    id: 57
                },
                {
                    name: '九龍塘',
                    id: 69
                },
                {
                    name: 'John Swire &amp; Sons Limited',
                    id: 2684
                }
            ],
            3: [
                {
                    name: '太子',
                    id: 11
                },
                {
                    name: '旺角',
                    id: 12
                },
                {
                    name: '油麻地',
                    id: 13
                },
                {
                    name: '荃灣',
                    id: 16
                },
                {
                    name: '大窩口',
                    id: 17
                },
                {
                    name: '葵興',
                    id: 18
                },
                {
                    name: '葵芳',
                    id: 19
                },
                {
                    name: '荔景',
                    id: 20
                },
                {
                    name: '美孚',
                    id: 21
                },
                {
                    name: '荔枝角',
                    id: 22
                },
                {
                    name: '長沙灣',
                    id: 23
                },
                {
                    name: '深水埗',
                    id: 24
                },
                {
                    name: '太子',
                    id: 25
                },
                {
                    name: '旺角',
                    id: 26
                },
                {
                    name: '油麻地',
                    id: 27
                },
                {
                    name: '佐敦',
                    id: 28
                },
                {
                    name: '尖沙咀',
                    id: 29
                },
                {
                    name: '中環',
                    id: 34
                },
                {
                    name: '金鐘',
                    id: 35
                },
                {
                    name: '金鐘',
                    id: 47
                },
                {
                    name: '荔景',
                    id: 62
                },
                {
                    name: '美孚',
                    id: 93
                },
                {
                    name: 'John Swire &amp; Sons Limited',
                    id: 2684
                }
            ],
            4: [
                {
                    name: '北角',
                    id: 40
                },
                {
                    name: '鰂魚涌',
                    id: 41
                },
                {
                    name: '康城',
                    id: 52
                },
                {
                    name: '寶琳',
                    id: 53
                },
                {
                    name: '坑口',
                    id: 54
                },
                {
                    name: '將軍澳',
                    id: 55
                },
                {
                    name: '調景嶺',
                    id: 56
                },
                {
                    name: '油塘',
                    id: 57
                },
                {
                    name: 'John Swire &amp; Sons Limited',
                    id: 2684
                }
            ],
            5: [
                {
                    name: '荔景',
                    id: 20
                },
                {
                    name: '香港',
                    id: 58
                },
                {
                    name: '九龍',
                    id: 59
                },
                {
                    name: '奧運',
                    id: 60
                },
                {
                    name: '南昌',
                    id: 61
                },
                {
                    name: '荔景',
                    id: 62
                },
                {
                    name: '青衣',
                    id: 63
                },
                {
                    name: '欣澳',
                    id: 64
                },
                {
                    name: '迪士尼',
                    id: 65
                },
                {
                    name: '東涌',
                    id: 66
                },
                {
                    name: '南昌',
                    id: 92
                }
            ],
            6: [
                {
                    name: '九龍塘',
                    id: 9
                },
                {
                    name: '紅磡',
                    id: 67
                },
                {
                    name: '旺角東',
                    id: 68
                },
                {
                    name: '九龍塘',
                    id: 69
                },
                {
                    name: '大圍',
                    id: 70
                },
                {
                    name: '沙田',
                    id: 71
                },
                {
                    name: '火炭',
                    id: 72
                },
                {
                    name: '馬場',
                    id: 73
                },
                {
                    name: '大學',
                    id: 74
                },
                {
                    name: '大埔墟',
                    id: 75
                },
                {
                    name: '太和',
                    id: 76
                },
                {
                    name: '粉嶺',
                    id: 77
                },
                {
                    name: '上水',
                    id: 78
                },
                {
                    name: '羅湖',
                    id: 79
                },
                {
                    name: '落馬洲',
                    id: 80
                },
                {
                    name: '大圍',
                    id: 81
                }
            ],
            7: [
                {
                    name: '大圍',
                    id: 70
                },
                {
                    name: '大圍',
                    id: 81
                },
                {
                    name: '車公廟',
                    id: 82
                },
                {
                    name: '沙田圍',
                    id: 83
                },
                {
                    name: '第一城',
                    id: 84
                },
                {
                    name: '石門',
                    id: 85
                },
                {
                    name: '大水坑',
                    id: 86
                },
                {
                    name: '恆安',
                    id: 87
                },
                {
                    name: '馬鞍山',
                    id: 88
                },
                {
                    name: '烏溪沙',
                    id: 89
                }
            ],
            8: [
                {
                    name: '美孚',
                    id: 21
                },
                {
                    name: '南昌',
                    id: 61
                },
                {
                    name: '紅磡',
                    id: 67
                },
                {
                    name: '尖東',
                    id: 90
                },
                {
                    name: '柯士甸',
                    id: 91
                },
                {
                    name: '南昌',
                    id: 92
                },
                {
                    name: '美孚',
                    id: 93
                },
                {
                    name: '荃灣西',
                    id: 94
                },
                {
                    name: '錦上路',
                    id: 95
                },
                {
                    name: '元朗',
                    id: 96
                },
                {
                    name: '朗屏',
                    id: 97
                },
                {
                    name: '天水圍',
                    id: 98
                },
                {
                    name: '兆康',
                    id: 99
                },
                {
                    name: '屯門',
                    id: 100
                }
            ],
            9: [
                {
                    name: '香港',
                    id: 58
                },
                {
                    name: '九龍',
                    id: 59
                },
                {
                    name: '青衣',
                    id: 63
                }
            ],
            10: [
                {
                    name: '金鐘',
                    id: 35
                },
                {
                    name: '金鐘',
                    id: 47
                },
                {
                    name: '海洋公園',
                    id: 48
                },
                {
                    name: '黃竹坑',
                    id: 49
                },
                {
                    name: '利東',
                    id: 50
                },
                {
                    name: '海怡半島',
                    id: 51
                }
            ]
        }
    }
};
