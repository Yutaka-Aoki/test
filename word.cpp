#include "word.h"

int MonthToSeason(int month){
	int season = ERROR;

	if((month >= 1) && (month <= 12 )){
		season = month/3-1;		//‹Gß•ÏŠ·.
		if( season  < 0 ){		//“Áê•”•ª•â³
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
