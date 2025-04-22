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
import Logo from "@assets/logo.svg"
import { RankingDialog } from "./components/RankingDialog"

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

const PROB_NAME = ["1", "2", "3", "4", "5", "B1", "B2"]

export const App = () => {
    const [code, setCode] = useState<string[]>(new Array(7).fill(""))
    const [probState, setProbState] = useState<ProbState[]>(new Array(7).fill("none"))
    const [probNum, setProbNum] = useState(0)

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
            <div css={css`position: absolute; left: 20px; top: 50%; transform: translateY(calc(-50% + 2px));`}>
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
                {new Array(7)
                    .fill(null)
                    .map((_v, i) => 
                        <NavElement
                            state={probState[i]}
                            key={i}
                            selected={probNum === i}
                            onClick={() => setProbNum(i)}
                        >
                            {PROB_NAME[i]}
                        </NavElement>
                    )}
            </HFlexBox>
        </div>
        <GridBox column={2} css={css`width: 100%; height: calc(100vh - 60px);`}>
            <div css={css`position: relative;`}>
                <Editor
                    theme="vs-dark"
                    value={code[probNum]}
                    onChange={(v) => {
                        const newCode = [...code]
                        newCode[probNum] = v ?? ""
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
                    onClick={() => {
                        const res = checkValid(probNum, code[probNum])
                        if (res) {
                            EventHandler.trigger("notification", "allowed", "맞았습니다!")
                            setProbState((probState) => {
                                const newProbState = [...probState]
                                newProbState[probNum] = "correct"
                                return newProbState
                            })
                        }
                        else {
                            EventHandler.trigger("notification", "forbidden", "틀렸습니다.")
                            setProbState((probState) => {
                                const newProbState = [...probState]
                                newProbState[probNum] = "wrong"
                                return newProbState
                            })
                        }
                    }}
                >
                    <TextBox size={18} weight={600}>제출</TextBox>
                </div>
            </div>
            <div css={css`padding: 24px; overflow-y: auto; white-space: pre-wrap;`}>
                <Title>문제 {PROB_NAME[probNum]}</Title>
                <VBox height={8} />
                <div css={css`line-height: 24px;`}>
                    {problemInfo[probNum].problem}
                </div>
                <VBox height={32} />
                {problemInfo[probNum].example.map(({ input, output }, i) => 
                    <Fragment key={i}>
                        <Subtitle>예제 입력 {i + 1}</Subtitle>
                        <VBox height={8} />
                        <Section>{input.length === 0 ? "없음" : input.join(", ")}</Section>
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
        />
    </div>
}