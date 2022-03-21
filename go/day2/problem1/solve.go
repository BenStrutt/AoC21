package main

import (
	"log"
	"fmt"
	"bufio"
	"os"
	"bytes"
	"strconv"
)

type move struct {
	axis *int
	direction int
}

func main() {
	file, err := os.Open("../commands.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	var position, depth int
	dirMap := map[string]move{
		"forward": move{&position, 1},
		"back": move{&position, -1},
		"up": move{&depth, -1},
		"down": move{&depth, 1},
	}

	for scanner.Scan() {
		direction, amount := splitCommand(scanner.Text())
		movement := dirMap[direction]
		*movement.axis += amount * movement.direction
	}

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}

	fmt.Println(position * depth)
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
