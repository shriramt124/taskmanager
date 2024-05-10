#include<iostream>
using namespace std;
#include<map>
int main(int argc, char const *argv[])
{
    map<int,pair<int,int>>m;
    m[1] =make_pair(3,4);
    m[2] = make_pair(3,4);
    m[4] = make_pair(3,4);
    int k = 2;
    for(int i = 0;i<k;i++){
        auto it =m.begin();
        m.erase(it);
    }
    auto it = m.begin();
    
  cout<<it->first<<endl;
  cout<<it->second.first<<endl;
    return 0;
}
