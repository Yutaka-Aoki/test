/* �\���� */
#include <iostream>
#include "word.h"
using namespace std;


int main(void){
	char *season_j[]={"�t","��","�H","�~"};
	char *season_e[]={"spring","summer","autumn","winter"};
	int month;				//���͂��ꂽ���f�[�^�i�[
	int season;				//�G�߃f�[�^�i�[
	int	language;			//����f�[�^�i�[
	struct Word ss;		//�\���f�[�^

	for( month = 1; month <= 12 ; month++ )
	{
		season=MonthToSeason(month);
		cout << month << ":" << season_e[season] << "/" << season_j[season] << endl;
	}
	cout << "connection of the tortoiseGit&GitHub&jenkins is OK!" << endl;
 
	return 0;
}
