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

	do{
		cout << "\n�G�߂����߂܂��B\n�����ł����F";
		cin >> month;

		season=MonthToSeason(month);
		if(season==ERROR )		{
			cout << "���͂�1-12�ł��I�I\n";
		}
	}while( season == ERROR );
	ss.japanese = season_j[season];
	ss.english = season_e[season];
	do{
		cout << "\n�\\�����錾��͉��ł����H(0=���{��@1=�p��):";
		cin >> language;

		if(( language < 0 )||( language > 1)){
			language = ERROR;
			cout << "���͂�0-1�ł��I�I\n";
		}
	}while( language == ERROR );

	Display( &ss,language );
	return 0;
}
