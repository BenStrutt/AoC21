package main

import (
	"log"
	"fmt"
	"bufio"
	"os"
	"bytes"
	"strconv"
)

func main() {
	file, err := os.Open("../commands.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	var horizontal, vertical, aim int
	aimDirMap := map[string]int{"down": 1, "up": -1}

	for scanner.Scan() {
		direction, amount := splitCommand(scanner.Text())

		if direction == "forward" {
			horizontal += amount
			vertical += aim * amount
			continue
		}

		aim += amount * aimDirMap[direction]
	}

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}

	fmt.Println(horizontal * vertical)
}

func splitCommand(command string) (string, int) {
	var direction, amount bytes.Buffer

	writingDirection := true
	for _, c := range command {
		if c == ' ' {
			writingDirection = false
			continue
		}

		if writingDirection {
			direction.WriteRune(c)
		} else {
			amount.WriteRune(c)
		}
	}

	dirStr := direction.String()
	amountStr := amount.String()

	amountInt, err := strconv.Atoi(amountStr)
	if err != nil {
		fmt.Println(err)
		os.Exit(2)
	}

	return dirStr, amountInt
}
