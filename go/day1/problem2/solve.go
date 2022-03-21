package main

import (
	"log"
	"fmt"
	"bufio"
	"os"
	"strconv"
)

func main() {
	file, err := os.Open("../numbers.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	count := 0
	lines := make([]int, 0)

	for scanner.Scan() {
		num, err := strconv.Atoi(scanner.Text())
		if err != nil {
			fmt.Println(err)
			os.Exit(2)
		}

		lines = append(lines, num)
	}

	for i := 3; i < len(lines); i++ {
		if lines[i] > lines[i - 3] {
			count++
		}
	}

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Increases: %d\n", count)
}
