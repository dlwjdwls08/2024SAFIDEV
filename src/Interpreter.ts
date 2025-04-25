type TokenType = "push" | "jmpb" | "jmpbtmp" | "jmpf" | "add" | "neg" | "dup" | "ascprnt" | "intprnt" | "intinpt" | "swap" | "rtt" | "clr"

interface Token {
    type: TokenType
    data?: number[]
    where?: number
}

interface ParenToken extends Token {
    type: "jmpbtmp"
    data: number[]
}

export const parse = (code: string) => {
    let pos = 0
    const parenStack: ParenToken[] = []
    const parseResult: Token[] = []

    while (pos < code.length) {
        const current = code[pos]
        const where = current.toUpperCase() === current ? 0 : 1
        
        if (current.toUpperCase() === "S") {
            if (pos < code.length) pos++
            let num = 0
            while (pos < code.length) {
                if ("SsFfKkCc!~?*/@#[]".includes(code[pos]) || code[pos] === "Aa"[(where + 1) % 2]) break
                if (code[pos] === "Aa"[where]) num++
                if (pos < code.length) pos++
            }
            if (pos >= 0) pos--
            parseResult.push({
                type: "push",
                data: [num],
                where: where
            })
        }
        else if (current.toUpperCase() === "A") parseResult.push({ type: "add", where: where })
        else if (current.toUpperCase() === "F") parseResult.push({ type: "neg", where: where })
        else if (current.toUpperCase() === "K") parseResult.push({ type: "dup", where: where })
        else if (current.toUpperCase() === "C") parseResult.push({ type: "clr", where: where })
        else if (current === "!") parseResult.push({ type: "ascprnt" })
        else if (current === "~") parseResult.push({ type: "intprnt" })
        else if (current === "?") parseResult.push({ type: "intinpt" })
        else if (current === "*") parseResult.push({ type: "swap", where: 0 })
        else if (current === "/") parseResult.push({ type: "swap", where: 1})
        else if (current === "@") parseResult.push({ type: "rtt", where: 0})
        else if (current === "#") parseResult.push({ type: "rtt", where: 1})
        else if (current === "[") {
            parseResult.push({ type: "jmpb" })
            parenStack.push({ type: "jmpbtmp", data: [parseResult.length - 1, pos] })
        }
        else if (current === "]") {
            if (parenStack.length === 0) throw new Error("Invalid close brackets.")
            const openingParen = parenStack.pop()
            if (openingParen === undefined) continue
            const newPos = openingParen.data[0]
            parseResult[newPos].data ??= []
            const data = parseResult[newPos].data as number[]
            data[0] = parseResult.length

            parseResult.push({ type: "jmpf", data: [newPos] })
        }
        if (pos < code.length) pos++
    }

    if (parenStack.length !== 0) {
        const paren = parenStack.pop()
        if (paren !== undefined) throw new Error("Invalid open brackets.") 
    }

    return parseResult
}

export const execute = (code: string, input: number[]) => {
    const tokens = parse(code)
    const stack: number[][] = [[], []]
    input.reverse()
    let ans = ""
    let pos = 0
    
    const pop = (where: number) => {
        if (stack[where].length === 0) return 0
        return stack[where].pop() as number
    }

    const inputPop = () => {
        if (input.length === 0) throw new Error("Input exceeded.")
        return input.pop() as number
    }

    while (pos < tokens.length) {
        const current = tokens[pos]
        console.log(current.type, stack[0], stack[1], pos)

        if (current.type === "push") stack[current.where!].push(current.data?.[0] ?? 0)
        else if (current.type === "add") stack[current.where!].push(pop(current.where!) + pop(current.where!))
        else if (current.type === "neg") stack[current.where!].push(-pop(current.where!))
        else if (current.type === "dup") stack[(current.where! + 1) % 2].push(stack[current.where!].at(-1) ?? 0)
        else if (current.type === "clr") stack[current.where!].length = 0
        else if (current.type === "ascprnt") {
            const temp = pop(0)
            if (temp < 0) throw new Error("ASCII range error")
            ans += String.fromCharCode(temp)
        }
        else if (current.type === "intprnt") ans += pop(0).toString()
        else if (current.type === "intinpt") stack[1].push(inputPop())
        else if (current.type === "swap") {
            if (stack[current.where!].length < 2) return
            const a = stack[current.where!].pop() as number
            const b = stack[current.where!].pop() as number
            stack[current.where!].push(a, b)
        }
        else if (current.type === "rtt") {
            if (stack[current.where!].length === 0) return
            const first = stack[current.where!].shift()
            stack[current.where!].push(first!)
        }
        else if (current.type === "jmpb") {
            const p = pop(0)
            if (p <= 0) pos = (current.data?.[0] ?? 0)
        }
        else if (current.type === "jmpf") {
            const p = pop(0)
            if (p > 0) pos = (current.data?.[0] ?? 0)
        }
        
        if (pos < tokens.length) pos++
    }
    return ans
}