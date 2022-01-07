#include <iostream>
#include <fstream>

int main(void)
{
	std::ifstream myFile("../numbers.txt");

	std::string myString;

	if (!myFile.is_open()) {
		std::cout << "Unable to open file\n";
		return 1;
	}

	int increases = 0;
	int previousNum = INT_MIN;
	int currentNum;
	while (getline(myFile, myString)) {	
		currentNum = std::stoi(myString);

		bool isFirstIter = previousNum == INT_MIN;
		bool isIncrease = currentNum > previousNum;
		if (isIncrease && !isFirstIter) {
			increases++;
		}

		previousNum = currentNum;
	}	

	std::cout << increases << "\n";

	myFile.close();

	return 0;
}
