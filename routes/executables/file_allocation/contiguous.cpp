#include<iostream>
#include<cstdlib>
#include<cstdio>
using namespace std;

struct file
{
	string nm;
	int i;
	int size;
};
	int index=0;
	struct file list[100];
	bool block[64]={0};
int searchfile( string s);
int checkfile(int size);
int addfile(string s,int k){
	if(searchfile(s)==-1){
	
	 int f=checkfile(k);
	 
	 

	if(f==-1){
			cout<<"Not possible\n";
			fflush(stdout);
			return 0;
	}else{
		list[index].nm=s;
		list[index].size=k;	
		list[index++].i=f;
		for(int j=f;j<f+k;j++)
				block[j]=1;
		return 1;
	}
	}
	else{
		printf("File name already taken\n");
		fflush(stdout);
		return 0;
	}
	return 0;
}

int deletefile(string s){
	int f=searchfile(s);
		
	if(f==-1){
		cout<<"file not found\n";
		fflush(stdout);
		return 0;
	}
	int in=list[f].i;
	int si=list[f].size;
	for(int j=in;j<in+si;j++)
		block[j]=0;
	list[f].i=-1;
	list[f].nm="";
	return 1;
}
int checkfile(int size){
	int j=0,k;
	while(j<64-size){
		if(block[j]==0){
				for(k=0;block[j+k]==0 && k<size; k++);
					if(k==size)
						return j;
					else
						j+=k;
		}
		else
			j++;
	}

	return -1;
}

int searchfile( string s){
	for(int i=0 ; i<20; i++)
		if(list[i].nm==s && list[i].size!=-1){
			return i;
		}
	return -1;	
}
void display(){
	
	for (int j=0;j<index;j++){
		if(list[j].i==-1)
			continue;
		else
		cout<<list[j].nm<<" "<<list[j].size<<" "<<list[j].i<<"<br>";
	}
	cout<<endl;
	fflush(stdout);
}
int main(int argc, char *argv[]){
	int ch,size,f,i=1,k=1;
	string name;
		
	while(1){
		i=k;
		ch=atoi(argv[i++]);
		k=i;// 1.add 2. delete 3. display 0.exit
		switch(ch){
		case 1:
			//Enter file name and size
		    name=argv[k++];
		    size=atoi(argv[k++]);
			if(addfile(name,size))
				display();
			break;
		case 2:
			name=argv[k++];
			if(deletefile(name))
				display();
			break;
		case 3:
			display();
			break;
		case 0:
			exit(0);

		fflush(stdin);

	}
}
}