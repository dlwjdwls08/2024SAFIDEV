import axios from "axios"
import { execute } from "./Interpreter"
import { problemInfo } from "./data/data"
import { EventHandler } from "./utils/event"

export const checkValid = async (category: number, prob: number, code: string) => {
    for (const { input, output } of problemInfo[category][prob].test) {
        try {
            if (category === 0) {
                if (execute(code, [...(input as number[])]) !== output) return false
            }
            if (category === 1) {
                const res = await axios.post("https://emkc.org/api/v2/piston/execute", {
                    language: "python3",
                    version: "3.10.0",
                    run_timeout: 1000,
                    files: [
                        {
                            content: code
                        }
                    ],
                    stdin: input as string
                })
                const { stdout, stderr } = res.data.run
                if (stderr) {
                    console.error(stderr)
                    throw Error("Error Occurred")
                }
                if (stdout.trim() !== output.trim()) return false
            }
        }
        catch (err) {
            EventHandler.trigger("notification", "forbidden", `${err}`)
            return false
        }
    }
    return true
}