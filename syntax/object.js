var chopperFn = function(){

    this.setOwner = (name) => this.owner = name;
    Object.assign(this,{
        owner: 'Jhon',
        getOwner: () => this.owner,
    })

}

var chopper = new chopperFn();
console.log(chopper.getOwner());
chopper.setOwner('Spiderman');
console.log(chopper.getOwner());