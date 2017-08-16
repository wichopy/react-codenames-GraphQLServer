### To query all cells: 
```
    { 
      wordCell {
        index
        word
        type
        isEnabled
      }
    }
```
### To query a single cell:
```
    { 
      wordCell(index: 1) {
        index
        word
        type
        isEnabled
      }
    }
```
### To do a mutation:
```
    mutation {
  updateCell(newCell: { index: 24, word: "Bob", type: "Red", isEnabled: false}) {
    index
    word
    type
    isEnabled
  }
}
```
