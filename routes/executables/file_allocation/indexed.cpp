#include<iostream>
#include<algorithm>
#include<fstream>
#include<cstdlib>
using namespace std;
typedef struct rit{
 	int ind;
 	int val;
 }rit;
struct file
{
	string nm;
	int size;
	rit a[10];
	int p;
	int* ptr=NULL;
};
	int index=0;
	struct file list[100];
	
	typedef struct memloc{
		int i;
		bool occ;
	}memloc;
	memloc block[64];
 	rit * indexblock[10];
 	
  
  int addfile(string name, int s);
	int deletefile(string s);
	rit *checkfile(int s);
	int searchfile(string s);
	

	int addfile(string name, int s){
		
		
		if(searchfile(name)==-1){
		
		rit * arr=checkfile(s);
		if(!arr){
			cout<<"Not possible\n";
			fflush(stdout);
			return 0;
		}
		int p;
		for( p=0; p<10; p++){
			if(indexblock[p]==NULL){
				break;
			}
		}
		if(p==10){
			cout<<"All index blocks filled\n";
			fflush(stdout);
			return 0;
		}
		indexblock[p]=arr;
		list[index].nm=name;
		list[index].size=s;
		list[index].p=p;
		for(int l=0 ; l<s ; l++ ){
		list[index].a[l].ind=arr[l].ind;
		list[index].a[l].val=arr[l].val;
		}
		for(int i=0; i<s ; i++){
			block[list[index].a[i].ind].occ=1; 
		}
		index++;
		return 1;
	}
	else{
		printf("File name already taken\n");
		fflush(stdout);
		return 0;
	}
}
	int deletefile(string s){
		
		int f=searchfile(s);
		if(f==-1){
			cout<<"File not found\n";
			fflush(stdout);
			return 0;
		}
		else{
			indexblock[list[f].p]=NULL;
			for(int i=0; i<list[f].size; i++){
				block[list[f].a[i].ind].occ=0; 
				}
		list[f].size=-1;
			return 1;
		
		}
	}
	rit * checkfile(int s){
		int cnt=0;
		rit *n=new rit[10];
		for(int i=10;i<64;i++){
			if(block[i].occ==0){
				n[cnt].ind=i;
				n[cnt++].val=block[i].i;
				if(cnt>10){
					break;
				}
			}

			if(cnt==s)
				return n;
		}
				
 		n=NULL;
		return n;
	}
	int searchfile(string s){
		for(int i=0; i<index; i++)
		if(list[i].nm==s && list[i].size!=-1){
			return i;
		}
	return -1;	

	}
	void display(){
	
	for (int j=0;j<index;j++){
		if(list[j].size==-1)
			continue;
		else{
		cout<<list[j].nm<<" "<<list[j].size<<" "<<list[j].p<<" ";
			for(int i=0;i<list[j].size;i++)
				cout<<list[j].a[i].val<<" ";
		}
		cout<<"<br>\n";
	}
	cout<<endl;
	fflush(stdout);
}
	int main(int argc, char *argv[]){
		int i;
	
	for(i=0; i<10; i++){
		block[i].i=-1;
		block[i].occ=1;
		
	}
	for(i=10; i<64; i++){
		block[i].i=i;
		block[i].occ=0;
	}
	random_shuffle(block+10,block + 64);
	
	int ch,size,f;
	string name;
	i=1;
	int k=1;
		
	while(1){
		i=k;
		ch=atoi(argv[i++]);
		k=i;// 1.add 2. delete 3. display 0.exit
		switch(ch){
		case 1:
			//Enter file name and size
		    name=argv[k++];
		    size=atoi(argv[k++]);
			if(addfile(name,size));
				//display();
			break;
		case 2:
			name=argv[k++];
			if(deletefile(name));
				//display();
			break;
		case 3:
			display();
			break;
		case 0:
		    display();
			exit(0);

		fflush(stdin);

	}
}
}