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
	var increases uint16

	scanner.Scan()
	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}

	lastNum, err := strconv.Atoi(scanner.Text())
	handleErr(err)

	for scanner.Scan() {
		num, err := strconv.Atoi(scanner.Text())
		handleErr(err)

		if num > lastNum {
			increases++
		}

		lastNum = num
	}

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Increases: %d\n", increases)
}

func handleErr(err error) {
	if err == nil { return }

	fmt.Println(err)
	os.Exit(2)
}
