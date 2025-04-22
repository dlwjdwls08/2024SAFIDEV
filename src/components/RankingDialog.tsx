import React, { useEffect, useState } from "react"
import Crown from "@assets/crown.svg"
import { TextBox } from "./common/TextBox"
import { DivProps } from "../global"
import { HFlexBox } from "./common/FlexBox"
import { css } from "@emotion/react"
import axios from "axios"

const PROB_NAME = ["1", "2", "3", "4", "5", "B1", "B2"]

interface RankingData {
    name: string,
    score: number,
    probNum: number
}

interface NavElementProps {
    selected?: boolean
    onClick?: () => void
}

const NavElement: React.FC<React.PropsWithChildren<NavElementProps>> = (props) => {
    return <div
        css={css`
            border-radius: ${props.selected ? 0 : 6}px;
            padding: 5px 12px;
            cursor: pointer;
            box-sizing: border-box;
            background-color: ${props.selected ? "var(--nav-hover)" : "inherit"};
            font-variant-numeric: tabular-nums;
            border-bottom: ${props.selected ? "3px solid #53B0AE" : "none"};

            :hover {
                background-color: var(--nav-hover);
            }
        `}
        onClick={props.onClick}
    >
        <TextBox
            weight={600}
            size={30}
        >
            {props.children}
        </TextBox>
    </div>
}

interface RankingElementProps {
    rankData: RankingData,
    rank: number
}

const RankingElement: React.FC<React.PropsWithoutRef<RankingElementProps>> = (props) => {
    return (
        <div
            css={{
                display: "flex"
            }}>
            <div>{props.rank}</div>
            <div>{props.rankData.name}</div>
        </div>
    )
}

interface RankingDialogProps {
    problemNumber: number
}

export const RankingDialog: React.FC<DivProps<RankingDialogProps>> = (props) => {
    const [dialogHidden, setDialogHidden] = useState<boolean>(true)
    const [probNum, setProbNum] = useState<number>(props.problemNumber)
    
    const [rankingData, setRankingData] = useState<RankingData[]>([])

    const handleOpenDialog = () => {
        axios.get("/api/ranking")
        .then(res => res.data)
        .then((data) => {
            console.log(data)
            setRankingData(data)
            setDialogHidden(false)
        })
    }

    return (
        <>
            <div
                onClick={handleOpenDialog}
                css={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "50px",
                    height: "50px",
                    position: "absolute",
                    left: "20px",
                    bottom: "20px",
                    backgroundColor: "rgb(55, 55, 255)",
                    borderRadius: "25px",
                    cursor: "pointer",
                    transition: "all linear 0.3s",
                    ":hover": {
                        backgroundColor: "rgb(80, 80, 255)",
                        transform: "translateY(-3px)"
                    }
                }}
            >
                <img
                    src={Crown}
                    css={{
                        width: "25px",
                        height: "25px",
                        filter: "grayscale(100%) invert(100%)"
                    }}
                />
            </div>
            <div
                css={{
                    display: dialogHidden ? "none" : "flex",
                    width: "100vw",
                    height: "100vh",
                    position: "absolute",
                    left: "0",
                    top: "0",
                    background: "rgba(0, 0, 0, 0.5)"
                }}
                onClick={() => setDialogHidden(true)}
            >

            </div>
            <div
                css={{
                    display: dialogHidden ? "none" : "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "70vw",
                    height: "70vh",
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "white",
                    boxShadow: "0 0 20px black",
                    padding: "20px"
                }}
            >
                {/* <TextBox
                    size={30}
                    weight={600}
                    center>
                    리더보드
                </TextBox> */}
                <div
                    css={{
                        flex: 1,
                        overflowY: "auto"
                    }}>
                    {
                        rankingData
                        .filter((v, _i) => v.probNum === probNum)
                        .map((v, i) => 
                            <RankingElement
                                rank={i + 1}
                                rankData={v}
                            />
                        )
                    }
                </div>
                <HFlexBox
                    css={{
                        margin: "0 auto",
                        height: "60px",
                        justifyContent: "center"
                    }}
                    gap={24}
                    center>
                    {new Array(7)
                        .fill(null)
                        .map((_v, i) => 
                        <NavElement
                            key={i}
                            selected={probNum === i}
                            onClick={() => setProbNum(i)}
                        >
                            {PROB_NAME[i]}
                        </NavElement>)}
                </HFlexBox>
                
            </div>
        </>
        
    )
}