# Menu Maker


**DONE**  
- [x] Basic Menu functionality : will generate a basic resteraunt menu catalog using the given editor below
- [x] Edit menu title functionality

**TODO**

- [ ] Add Delete functionality to table entries
- [ ] Fix the logic bug in which if the owner adds a 3 element entry(i.e [name, halfP,fullPrice]) 
     to a 2 element table (i.e [name, price]), all the prices from 2 column tentries jumps to 
     halfP column, when they should be jumping to fullPColumn 
     (in practise it should be counted as a user's mistake: if the table is supposed to consist
      of 3column items, all entries  should be added as 3 column from the first entry. ) 
      (`PROBABLE_FIX : in for loop that generates template, check if current entry size  is less than max entry size. if yes, then instead of generating a template for [entry,val], generate a template for [entry,0,val] `)
- [ ] `window.print()` does not work very nicely with mobile browsers. the button on click is 1)somehow removing all the color 2)somehow NOT removing buttons or editor, 3) NOT Printing in mobile version of website


