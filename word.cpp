#include "word.h"

int MonthToSeason(int month){
	int season = ERROR;

	if((month >= 1) && (month <= 12 )){
		season = month/3-1;		//�G�ߕϊ�.
		if( season  < 0 ){		//���ꕔ���␳
			season = 3;
		}
	}
	return( season );
}
void Display( struct Word* ssp,int language){
	if( language ){
		cout << ssp->english << endl;
	}
	else{
		cout << ssp->japanese << endl;
	}
}
