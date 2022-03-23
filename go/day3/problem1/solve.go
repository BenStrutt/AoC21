package main

import (
	"log"
	"fmt"
	"bufio"
	"strconv"
	"os"
)

func main() {
	file, err := os.Open("../binary.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	firstPass := true
	var mostCommonDigit []int

	for scanner.Scan() {
		text := scanner.Text()
		for i, r := range text {
			if firstPass {
				mostCommonDigit = make([]int, len(text))
				firstPass = false
			}

			if num, err := strconv.Atoi(string(r)); err != nil {
				log.Fatal(err)
			} else {
				if num == 1 {
					mostCommonDigit[i]++
				} else {
					mostCommonDigit[i]--
				}
			}
		}
	}

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}

	gammaArr := intMap(mostCommonDigit, func(num int) int {
		if num < 0 {
			return 0
		}

		return 1
	})

	epsilonArr := intMap(mostCommonDigit, func(num int) int {
		if num < 0 {
			return 1
		}

		return 0
	})

	gamma := intArrToInt(gammaArr)
	epsilon := intArrToInt(epsilonArr)

	fmt.Println(gamma * epsilon)
}

func intMap(arr []int, mapFunc func(int) int) []int {
	result := make([]int, len(arr))

	for i := 0; i < len(arr); i++ {
		result[i] = mapFunc(arr[i])
	}

	return result
}

func intArrToInt(arr []int) int {
	var result int

	size := len(arr)
	for i := 0; i < size; i++ {
		bit := size - (i + 1)

		intBit :=  1
		for bit != 0 {
			intBit *= 2
			bit--
		}

		if arr[i] == 1 {
			result = result | intBit
		}
	}

	return result
}
