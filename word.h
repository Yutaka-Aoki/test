#include <iostream>
using namespace std;

int MonthToSeason(int month);
void Display( struct Word* ssp,int language);

struct Word{
	char *japanese;		//�t�ďH�~
	char *english;		//spring,summer,autumn,winter
};
#define ERROR -1				//�G���[�R�[�h
