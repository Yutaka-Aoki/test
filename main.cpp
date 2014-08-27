/* 構造体 */
#include <iostream>
#include "word.h"
using namespace std;

int main(void){
	char *season_j[]={"春","夏","秋","冬"};
	char *season_e[]={"spring","summer","autumn","winter"};
	int month;				//入力された月データ格納
	int season;				//季節データ格納
	int	language;			//言語データ格納
	struct Word ss;		//表示データ

	do{
		cout << "\n季節を求めます。\n何月ですか：";
		cin >> month;

		season=MonthToSeason(month);
		if(season==ERROR )		{
			cout << "入力は1-12です！！\n";
		}
	}while( season == ERROR );
	ss.japanese = season_j[season];
	ss.english = season_e[season];
	do{
		cout << "\n表\示する言語は何ですか？(0=日本語　1=英語):";
		cin >> language;

		if(( language < 0 )||( language > 1)){
			language = ERROR;
			cout << "入力は0-1です！！\n";
		}
	}while( language == ERROR );

	Display( &ss,language );
	return 0;
}
