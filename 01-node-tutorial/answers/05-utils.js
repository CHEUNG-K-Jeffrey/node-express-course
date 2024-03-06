const greetUser = () => {
    const [languageCode, regionCode] = process.env.LANG.split(".")[0].split("_");
    const languageName = (new Intl.DisplayNames(['en'], {type: 'language'}))
        .of(languageCode);
    const regionName = (new Intl.DisplayNames(['en'], {type: 'region'}))
    .of(regionCode);
    console.log(`Welcome ${process.env.USER}!`)
    console.log(`You speak ${languageName}.`);
    console.log(`You live in ${regionName}.`);
}

module.exports = {greetUser};