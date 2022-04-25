## Format

###TypeScript
Usage of the `any` type is frowned upon; only use it for a type which we are currently unsure of in development.  
Functions should be declared in the following format where the open bracket is on the same line as the function definition separated by a space:
```TypeScript
function camelCasedFunctionName() {
  // do something
};
```
Semi-colons at the end of each statement are mandatory.  
Indentations are 4 spaces.  
Variable names must either be `camelCased` or `underscore_spaced`.  
Lists / Objects / Enums must have a trailing comma, i.e.
```TypeScript
stuff = {
  thing1 : String,
  thing2 : Number,
}
```

### HTML / JSX
Indentations are 2 spaces.  
Elements without closing tag have a space before the `\>`
```HTML
<p>This is a single line p</p>
<p>This 
   is
   a
   multi
   line
   p
</p>
<div>
  <div class="body">
  </div>
</div>
<img src="image.png" alt="this is an element without a separate closing tag" />
```

### CSS
Indentations are 4 spaces.  
Classes must be declared in the following format with the open bracket on the same line as the class name separated by a space:
```CSS
.body {
    width: 100vw;
    height: 100vh;
}
```