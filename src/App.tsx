import { Editor } from "@monaco-editor/react"
import { GridBox } from "./components/common/GridBox"
import { TextBox } from "./components/common/TextBox"
import { Fragment, useState } from "react"
import { css } from "@emotion/react"
import { VBox } from "./components/common/VBox"
import { Card } from "./components/common/Card"
import { HFlexBox } from "./components/common/FlexBox"
import { checkValid } from "./checkValid"
import { EventHandler } from "./utils/event"
import { NotiContainer } from "./components/common/Notification"
import { problemInfo } from "./data/data"
import { ModalContainer } from "./components/common/Modal"
import { ModalContent } from "./components/ModalContent"
import Logo from "./assets/logo.svg"
import { RankingDialog } from "./components/RankingDialog"
import axios from "axios"

const Title: React.FC<React.PropsWithChildren> = (props) => 
    <TextBox weight={800} size={24}>
        {props.children}
    </TextBox>

const Subtitle: React.FC<React.PropsWithChildren> = (props) => 
    <TextBox weight={600} size={20}>
        {props.children}
    </TextBox>

const Section: React.FC<React.PropsWithChildren> = (props) =>
    <Card
        css={css`
            background-color: var(--idevsaf-section);
            align-items: start;
        `}
    >
        {props.children}
    </Card>

type ProbState = "correct" | "wrong" | "none"

interface NavElementProps {
    state: ProbState
    selected?: boolean
    onClick?: () => void
}

const NavElement: React.FC<React.PropsWithChildren<NavElementProps>> = (props) => {
    const color = props.state === "none" ? "inherit" : `var(--idevsaf-${props.state})`

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
            color={color}
        >
            {props.children}
        </TextBox>
    </div>
}

const PROB_NAME = [
    ["1", "2", "3", "4", "5", "B1", "B2"],
    ["1", "2", "3", "4", "5"]
]

const CATEGORY_NAME = ["SAF!", "숏코딩"]

export const App = () => {
    const [code, setCode] = useState<string[][]>([new Array(7).fill(""), new Array(5).fill("")])
    const [probState, setProbState] = useState<ProbState[][]>([new Array(7).fill("none"), new Array(5).fill("none")])
    const [probNum, setProbNum] = useState(0)
    const [categoryNum, setCategoryNum] = useState(0)
    const [studentID, setStudentID] = useState("")
    const [name, setName] = useState("")
    const [infoState, setInfoState] = useState(false)

    const handleInfoStateSubmit = () => {
        const sidregex = /^\d{2}-\d{3}$/
        if (sidregex.test(studentID) && name !== "") {
            setInfoState(true)
            console.log(studentID, name)
        }
    }

    return <div css={css`overflow: hidden; height: 100vh;`}>
        <NotiContainer />
        <ModalContainer />
        <div
            css={css`
                border-bottom: 1px solid var(--nav-border);
                width: 100%;
                box-sizing: border-box;
                position: relative;
            `}
        >
            <div 
                css={{
                    position: "absolute",
                    left: "20px",
                    top: "50%",
                    transform: "translateY(calc(-50% + 2px))",
                }}>
                <img src={Logo} css={css`height: 100px;`} />
            </div>
            <div
                css={css`
                    position: absolute;
                    right: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                    padding: 10px 12px;
                    border-radius: 8px;
                    cursor: pointer;
                    
                    :hover {
                        background-color: var(--nav-hover);
                    }
                `}
                onClick={() => EventHandler.trigger("modal", <ModalContent />)}
            >
                도움말
            </div>
            <HFlexBox
                css={css`
                    margin: 0 auto;
                    height: 60px;
                    justify-content: center;
                `}
                gap={24}
                center
            >
                <div css={{
                        transition: "all linear 0.3s",
                        borderRadius: "10px",
                        padding: "12px 16px",
                        backgroundColor: "white",
                        width: "fit-content",
                        cursor: "pointer",
                        boxShadow: "0 0 3px lightgray",
                        ":hover": {
                            transform: "scale(1.02, 1.02)"
                        }
                    }}
                    onClick={() => {
                        setProbNum(0)
                        setCategoryNum((prev) => (prev + 1) % CATEGORY_NAME.length)}
                    }
                >
                    {CATEGORY_NAME[categoryNum]}
                </div>

                {PROB_NAME[categoryNum]
                    .map((_v, i) => 
                    <NavElement
                        state={probState[categoryNum][i]}
                        key={i}
                        selected={probNum === i}
                        onClick={() => setProbNum(i)}
                    >
                        {PROB_NAME[categoryNum][i]}
                    </NavElement>
                )}
            </HFlexBox>
        </div>
        <GridBox column={2} css={css`width: 100%; height: calc(100vh - 60px);`}>
            <div css={css`position: relative;`}>
                <Editor
                    theme="vs-dark"
                    value={code[categoryNum][probNum]}
                    onChange={(v) => {
                        const newCode = [...code]
                        newCode[categoryNum][probNum] = v ?? ""
                        setCode(newCode)
                    }}
                    options={{
                        matchBrackets: "never",
                        autoClosingBrackets: "never"
                    }}
                    css={css`
                        .unexpected-closing-bracket {
                            color: #d4d4d4 !important;
                        }
                    `}
                />
                {infoState ? (
                    <div
                        css={css`
                            padding: 12px 16px;
                            background-color: #DDDFE0;
                            border-radius: 8px;
                            width: fit-content;
                            transition: all 0.3s linear;
                            cursor: pointer;
                            position: absolute;
                            right: 32px;
                            bottom: 20px;

                            :hover {
                                transform: translateY(-3px);
                                background-color: #F5F6F7;
                            }
                        `}
                        onClick={async () => {
                            const res = await checkValid(categoryNum, probNum, code[categoryNum][probNum])
                            if (res) {
                                EventHandler.trigger("notification", "allowed", "맞았습니다!")
                                await axios.post("https://2025-safidevserver.vercel.app/api/ranking", {
                                    studentID: studentID,
                                    name: name,
                                    score: code[categoryNum][probNum].length,
                                    prob: probNum,
                                    category: categoryNum
                                })
                                setProbState((probState) => {
                                    const newProbState = probState.map((row, rowIdx) => 
                                        rowIdx === categoryNum
                                            ? row.map((cell, colIdx) =>
                                                colIdx === probNum ? "correct" : cell
                                            )
                                            : [...row]
                                    )
                                    return newProbState
                                })
                            }
                            else {
                                EventHandler.trigger("notification", "forbidden", "틀렸습니다.")
                                setProbState((probState) => {
                                    const newProbState = probState.map((row, rowIdx) => 
                                        rowIdx === categoryNum
                                            ? row.map((cell, colIdx) =>
                                                colIdx === probNum ? "wrong" : cell
                                            )
                                            : [...row]
                                    )
                                    return newProbState
                                })
                            }
                        }}
                    >
                        <TextBox size={18} weight={600}>제출</TextBox>
                    </div>
                ) : (
                    <div
                        css={css`
                            padding: 12px 16px;
                            background-color: #DDDFE0;
                            border-radius: 8px;
                            width: 150px;
                            transition: all 0.3s linear;
                            position: absolute;
                            right: 32px;
                            bottom: 20px;
                            display: flex;
                            flex-direction: column;
                            gap: 5px;
                        `}
                    >
                        <input
                            css={{
                                outline: "none",
                                background: "rgb(200, 200, 200)",
                                borderRadius: "5px",
                                border: "none",
                                textAlign: "center"
                                
                            }}
                            placeholder="ex.25-000"
                            value={studentID}
                            onChange={(e) => {
                                setStudentID(e.target.value)
                            }}
                        />
                        <input
                            css={{
                                outline: "none",
                                background: "rgb(200, 200, 200)",
                                borderRadius: "5px",
                                border: "none",
                                textAlign: "center"
                            }}
                            placeholder="ex.차재윤"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                        />
                        <button
                            css={{
                                background: "rgb(200, 200, 200)",
                                borderRadius: "5px",
                                border: "none",
                                cursor: "pointer"
                            }}
                            onClick={handleInfoStateSubmit}    
                        >
                            확인
                        </button>
                    </div>
                )}
            </div>
            <div css={css`padding: 24px; overflow-y: auto; white-space: pre-wrap;`}>
                <Title>문제 {PROB_NAME[categoryNum][probNum]}</Title>
                <VBox height={8} />
                <div css={css`line-height: 24px;`}>
                    {problemInfo[categoryNum][probNum].problem}
                </div>
                <VBox height={32} />
                {problemInfo[categoryNum][probNum].example.map(({ input, output }, i) => 
                    <Fragment key={i}>
                        <Subtitle>예제 입력 {i + 1}</Subtitle>
                        <VBox height={8} />
                        <Section>{categoryNum === 0 ? input.length === 0 ? "없음" : (input as number[]).join(", ") : input as string}</Section>
                        <VBox height={32} />
                        <Subtitle>예제 출력 {i + 1}</Subtitle>
                        <VBox height={8} />
                        <Section>{output}</Section>
                        <VBox height={32} />
                    </Fragment>
                )}
            </div>
        </GridBox>
        <div>

        </div>
        <RankingDialog 
            problemNumber={probNum}
            categoryNumber={categoryNum}
        />
    </div>
}