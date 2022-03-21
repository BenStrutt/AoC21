#include <iostream>
#include <fstream>
#include <typeinfo>

int main(void)
{
	std::ifstream my_file("../commands.txt");
	std::string my_string;

	if (!my_file.is_open()) {
		std::cout << "Unable to open file\n";
		return 1;
	}	
	
	int position, depth = 0;
	while (getline(my_file, my_string)) {
		int str_size = my_string.size();
		int distance = my_string[str_size - 1];
		std::string direction(1, my_string[0]);	

		if (direction == "f") {
			position += distance;
			continue;
		}

		int vertical_dir = direction.compare("u") == 0 ? -1 : 1;
		depth += distance * vertical_dir;
	}	

	std::cout << position * depth << "\n";

	my_file.close();

	return 0;
}
