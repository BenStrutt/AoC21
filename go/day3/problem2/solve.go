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
	inputNums := make([][]int, 0)

	for scanner.Scan() {
		text := scanner.Text()
		inputNum := make([]int, 0)

		for i, r := range text {
			if firstPass {
				mostCommonDigit = make([]int, len(text))
				firstPass = false
			}

			if digit, err := strconv.Atoi(string(r)); err != nil {
				log.Fatal(err)
			} else {
				inputNum = append(inputNum, digit)

				if digit == 1 {
					mostCommonDigit[i]++
				} else {
					mostCommonDigit[i]--
				}
			}
		}

		inputNums = append(inputNums, inputNum)
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

	gammaNums := make([][]int, len(inputNums))
	epsilonNums := make([][]int, len(inputNums))
	copy(gammaNums, inputNums)
	copy(epsilonNums, inputNums)

	for i, digit := range gammaArr {
		gammaNums = filter(gammaNums, func(digits []int) bool {
			return digits[i] == digit
		})

		if len(gammaNums) <= 1 { break }
	}

	for i, digit := range epsilonArr {
		epsilonNums = filter(epsilonNums, func(digits []int) bool {
			return digits[i] == digit
		})

		if len(epsilonNums) <= 1 { break }
	}

	oxygen := intArrToInt(gammaNums[0])
	co2 := intArrToInt(epsilonNums[0])

	fmt.Println(oxygen * co2)
}

func intMap(arr []int, mapFunc func(int) int) []int {
	result := make([]int, len(arr))

	for i := 0; i < len(arr); i++ {
		result[i] = mapFunc(arr[i])
	}

	return result
}

func filter(arr [][]int, filterFunc func([]int) bool) [][]int {
	result := make([][]int, 0)

	for i := 0; i < len(arr); i++ {
		if filterFunc(arr[i]) {
			result = append(result, arr[i])
		}
	}

	return result
}

func intArrToInt(arr []int) int {
	var result int

	size := len(arr)
	for i := 0; i < size; i++ {
		bit := size - (i + 1)

		if arr[i] == 1 {
			result = result | power(2, bit)
		}
	}

	return result
}

func power(base, exp int) int {
	result := 1
	for exp != 0 {
		result *= base
		exp--
	}
	return result
}
