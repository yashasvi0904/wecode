export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  python: "3.10.0",
  cpp: "11.0",
  c: "11.0",
  java: "17.0",
};

export const CODE_SNIPPETS = {
  javascript: `// JavaScript Solution
function solution() {
  console.log("Hello, World!");
}

solution();
`,
  python: `# Python Solution
def solution():
    print("Hello, World!")

solution()
`,
  cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    cout << "Hello, World!" << endl;
    return 0;
}
`,
  c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}
`,
  java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Hello, World!");
    }
}
`,
};
