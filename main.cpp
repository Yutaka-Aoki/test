/* \‘¢‘Ì */
#include <iostream>
#include "word.h"
using namespace std;


int main(void){
	char *season_j[]={"t","‰Ä","H","“~"};
	char *season_e[]={"spring","summer","autumn","winter"};
	int month;				//“ü—Í‚³‚ê‚½Œƒf[ƒ^Ši”[
	int season;				//‹Gßƒf[ƒ^Ši”[
	int	language;			//Œ¾Œêƒf[ƒ^Ši”[
	struct Word ss;		//•\¦ƒf[ƒ^

	for( month = 1; month <= 12 ; month++ )
	{
		season=MonthToSeason(month);
		cout << month << ":" << season_e[season] << "/" << season_j[season] << endl;
	}
	cout << "connection of the tortoiseGit&GitHub&jenkins is OK!" << endl;
 
	return 0;
}
