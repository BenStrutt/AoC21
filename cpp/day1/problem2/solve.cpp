#include <iostream>
#include <fstream>
#include <vector>

int main(void)
{
	std::ifstream myFile("../numbers.txt");
	std::string myString;

	if (!myFile.is_open()) {
		std::cout << "Unable to open file\n";
		return 1;
	}

	std::vector<int> depths = {};
	while (getline(myFile, myString)) {
		depths.push_back(std::stoi(myString));		
	}

	int increases = 0;
	for (int i = 3; i < depths.size(); i++) {
		if (depths[i] > depths[i - 3]) {
			increases++;
		}
	}

	std::cout << increases << "\n";

	myFile.close();

	return 0;
}
