interface IProblem {
    problem: string
    example: {
        input: number[] | string
        output: string
    }[]
    test: {
        input: number[] | string
        output: string
    }[]
}

export const problemInfo: IProblem[][] = [
    [
        {
            problem: "이번 SAF에는 많은 연구회가 부스를 운영한다. 그 중 N개의 부스는 형설관 3층에, M개의 부스는 형설관 4층에 설치되어 있다. 길쭉이는 부스를 모두 방문하려고 하는데, 문득 총 부스의 개수가 궁금해졌다. 길쭉이를 도와 연구회 부스의 개수를 출력하는 프로그램을 작성하시오.\n\n첫 번째 입력으로 N, 두 번째 입력으로 M이 주어진다.",
            example: [
                {
                    input: [3, 2],
                    output: "5"
                }
            ],
            test: [
                {
                    input: [3, 2],
                    output: "5"
                },
                {
                    input: [46, 92],
                    output: "138"
                },
                {
                    input: [-329, 329],
                    output: "0"
                }
            ]
        },
        {
            problem: "길쭉이는 이번 SAF에 새로 생긴 라인 대항전에 참여할 예정이다. 총 N개의 라인이 라인 대항전에 참여했는데, 라인별로 몇 명이 참가했는지를 알고 있는 길쭉이는 라인 대항전의 총 참여자 수를 계산하려고 한다. 길쭉이를 도와 라인 대항전의 총 참여자 수를 계산하는 프로그램을 작성하시오.\n\n첫 번째 입력으로 N이 주어진다. 두 번째 입력부터는 각 라인의 참여자 수가 주어진다.",
            example: [
                {
                    input: [3, 2, 3, 5],
                    output: "10"
                },
                {
                    input: [1, 1],
                    output: "1"
                }
            ],
            test: [
                {
                    input: [3, 2, 3, 5],
                    output: "10"
                },
                {
                    input: [4, 84, 46, 46, 92],
                    output: "268"
                },
                {
                    input: [3, 1, -329, 329],
                    output: "1"
                }
            ]
        },
        {
            problem: "SAF를 즐기고 있는 길쭉이는 어느덧 IDEV 부스에 도착했다. IDEV 부스에서는 문제를 풀 때마다 사탕을 준다. 첫 번째 문제와 두 번째 문제를 풀었을 때는 각각 1개의 사탕을 받을 수 있고, k(k≥3)번째 문제를 풀면 k-2번째 문제와 k-1번째 문제를 풀었을 때 받았던 사탕 개수의 합만큼 사탕이 주어진다. 길쭉이가 N번째 문제를 풀었을 때 받을 수 있는 사탕의 개수를 구하는 프로그램을 작성하시오.\n\n첫 번째 입력으로 N이 주어진다.",
            example: [
                {
                    input: [1],
                    output: "1"
                },
                {
                    input: [2],
                    output: "1"
                },
                {
                    input: [3],
                    output: "2"
                },
                {
                    input: [8],
                    output: "21"
                }
            ],
            test: [
                {
                    input: [1],
                    output: "1"
                },
                {
                    input: [2],
                    output: "1"
                },
                {
                    input: [8],
                    output: "21"
                },
                {
                    input: [3],
                    output: "2"
                },
                {
                    input: [12],
                    output: "144" 
                }
            ]
        },
        {
            problem: "모든 축제의 하이라이트는 단연 클럽 공연이다. 이번 클럽 공연에는 N개의 클럽이 참여했는데, 길쭉이는 어떤 클럽의 공연이 가장 인기가 많았는지 알아보려고 한다. 공연한 클럽의 개수 N과 각 클럽별 관람객 수가 주어질 때, 가장 많은 관람객이 참여한 클럽 공연의 관람객 수를 구하는 프로그램을 작성하시오.\n\n첫 번째 입력으로 N이 주어진다. 두 번째 입력부터는 각 클럽 공연의 관람객 수가 주어진다.",
            example: [
                {
                    input: [3, 2, 3, 5],
                    output: "5"
                },
                {
                    input: [8, 10, 10, 10, 10, 11, 10, 10, 10],
                    output: "11"
                },
                {
                    input: [1, 3],
                    output: "3"
                }
            ],
            test: [
                {
                    input: [3, 2, 3, 5],
                    output: "5"
                },
                {
                    input: [8, 10, 10, 10, 10, 11, 10, 10, 10],
                    output: "11"
                },
                {
                    input: [1, 3],
                    output: "3"
                },
                {
                    input: [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                    output: "12"
                }
            ]
        },
        {
            problem: "길쭉이는 이번 축제를 즐겁게 즐기다가 문득 축제의 이름이 생각나지 않는다는 사실을 깨달았다. 길쭉이에게 축제의 이름을 알려주기 위해 “SAF”를 출력하는 코드를 작성해보자.",
            example: [
                {
                    input: [],
                    output: "SAF"
                }
            ],
            test: [
                {
                    input: [],
                    output: "SAF"
                },
                {
                    input: [],
                    output: "SAF"
                }
            ]
        },
        {
            problem: "\"이번 SAF 슬로건이 뭐였지? 라틴어였던 것 같은데... 너무 길어서 기억을 못하겠어 ㅠㅠ 아름답고 과학적이라는 내용이었던 것 같아!\" 길쭉이는 기억력이 좋지 않아 이번 SAF의 슬로건을 까먹었다. 길쭉이에게 슬로건을 알려주기 위해 이번 SAF의 슬로건을 출력하는 코드를 작성해보자.\n\n예시 입출력은 주어지지 않는다.",
            example: [],
            test: [
                {
                    input: [],
                    output: "Scientia, Absoluta Fabulosa."
                }
            ]
        },
        {
            problem: "어딘가 이상한 SAF 카페에서 한 사람에게 판매하는 음료수의 수량은 소수 잔만큼으로 제한되어 있다. 예를 들어, 어떤 사람에게 세 잔의 음료수는 판매하지만 여섯 잔의 음료수는 판매하지 않는다. 현재 SAF 카페가 가진 재료로 최대한 만들 수 있는 음료가 총 N잔일 때, 길쭉이가 사갈 수 있는 음료수의 최대 잔 수를 출력하는 프로그램을 작성하시오.\n\n첫 번째 입력으로 N이 주어진다.",
            example: [
                {
                    input: [5],
                    output: "5"
                },
                {
                    input: [25],
                    output: "23"
                },
                {
                    input: [100],
                    output: "97"
                }
            ],
            test: [
                {
                    input: [5],
                    output: "5"
                },
                {
                    input: [25],
                    output: "23"
                },
                {
                    input: [100],
                    output: "97"
                },
                {
                    input: [2],
                    output: "2"
                },
                {
                    input: [4],
                    output: "3"
                },
                {
                    input: [90],
                    output: "89"
                },
                {
                    input: [49],
                    output: "47"
                }
            ]
        }
    ],
    [
        {
            problem: "파이썬 테스트 문제 1",
            example: [
                {
                    input: "1 3",
                    output: "4"
                }
            ],
            test: [
                {
                    input: "1 3",
                    output: "4"
                }
            ]
        }
    ]
]