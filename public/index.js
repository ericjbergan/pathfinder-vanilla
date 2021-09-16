const abilitiesArray = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];

const data = {
    STRabilityScore: 0,
    DEXabilityScore: 0,
    CONabilityScore: 0,
    INTabilityScore: 0,
    WISabilityScore: 0,
    CHAabilityScore: 0,
    STRtempAdjustment: null,
    DEXtempAdjustment: null,
    CONtempAdjustment: null,
    INTtempAdjustment: null,
    WIStempAdjustment: null,
    CHAtempAdjustment: null,
    STRtempModifier: null,
    DEXtempModifier: null,
    CONtempModifier: null,
    INTtempModifier: null,
    WIStempModifier: null,
    CHAtempModifier: null,
    charName: null,
    alignment: null,
    playerName: null,
    charLevel: null,
    deity: null,
    homeland: null,
    race: null,
    size: null,
    gender: null,
    age: null,
    height: null,
    weight: null,
    hair: null,
    eyes: null,
    hitPointTotal: null,
    dmgReduction: null,
    woundsBox: null,
    initMiscModifier: 0,
    armorClassTotal: 0,
    armorBonus: 0,
    shieldBonus: 0,
    ACdexModifier: 0,
    sizeModifier: 0,
    naturalArmor: 0,
    deflectionModifier: 0,
    ACmiscModifier: 0,
    fortitudeBaseSave: 0,
    reflexBaseSave: 0,
    willBaseSave: 0,
    fortitudeMagicModifier: 0,
    reflexMagicModifier: 0,
    willMagicModifier: 0,
    fortitudeMiscModifier: 0,
    reflexMiscModifier: 0,
    willMiscModifier: 0,
    fortitudeTempModifier: 0,
    reflexTempModifier: 0,
    willTempModifier: 0,
    saveTextarea: null,
    babInput: 0,
    spellResistInput: 0,
    weapon0WeaponInput: null,
    weapon1WeaponInput: null,
    weapon2WeaponInput: null,
    weapon3WeaponInput: null,
    weapon4WeaponInput: null,
    weapon0AttackBonusInput: null,
    weapon1AttackBonusInput: null,
    weapon2AttackBonusInput: null,
    weapon3AttackBonusInput: null,
    weapon4AttackBonusInput: null,
    weapon0CriticalInput: null,
    weapon1CriticalInput: null,
    weapon2CriticalInput: null,
    weapon3CriticalInput: null,
    weapon4CriticalInput: null,
    weapon0TypeInput: null,
    weapon1TypeInput: null,
    weapon2TypeInput: null,
    weapon3TypeInput: null,
    weapon4TypeInput: null,
    weapon0RangeInput: null,
    weapon1RangeInput: null,
    weapon2RangeInput: null,
    weapon3RangeInput: null,
    weapon4RangeInput: null,
    weapon0AmmoInput: null,
    weapon1AmmoInput: null,
    weapon2AmmoInput: null,
    weapon3AmmoInput: null,
    weapon4AmmoInput: null,
    weapon0DamageInput: null,
    weapon1DamageInput: null,
    weapon2DamageInput: null,
    weapon3DamageInput: null,
    weapon4DamageInput: null
}

const createNewDiv = (id, newClass, insideText) => {
    id ? id = id.split(' ').join('') : null;
    id ? id = id.charAt(0).toLowerCase() + id.slice(1).replace(/[^a-zA-Z0-9]/g, '') : null;
    const newDiv = document.createElement('div');
    id ? newDiv.id = id : null;
    newDiv.setAttribute('class', newClass);
    insideText ? newDiv.innerHTML = insideText : null;
    return newDiv;
}

const createNewLabel = newClass => {
    const newLabel = document.createElement('label');
    newLabel.setAttribute('class', newClass);
    return newLabel;
}

const createNewInput = (id, newClass, newType) => {
    id = id.split(' ').join('');
    id = id.charAt(0).toLowerCase() + id.slice(1);
    const newInput = document.createElement('input');
    newInput.id = id;
    newInput.setAttribute('class', newClass);
    newInput.setAttribute('onchange', 'handleChange(event)');
    newType ? newInput.type = newType : null;
    data[id] ? newInput.value = data[id] : null;
    return newInput;
}

const createNewSymbol = symbol => {
    const newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'symbol');
    newDiv.innerHTML = symbol;
    return newDiv;
}

const createCheckbox = (id, newClass) => {
    id = id.split(' ').join('');
    id = id.charAt(0).toLowerCase() + id.slice(1);
    const newCheckbox = document.createElement('input');
    newCheckbox.id = id;
    newCheckbox.setAttribute('type', 'checkbox');
    newCheckbox.setAttribute('class', newClass);
    newCheckbox.setAttribute('onchange', 'handleCheckboxChange(event)');
    return newCheckbox;
}

const handleChange = e => {
    data[e.target.id] = e.target.value;
    handleArmorClassChange();
    handleSavingThrowChange();
    initialCalcs();
}

const handleCheckboxChange = e => {
    console.log('checked');
    data[e.id] = !data[e.id];
}

const calculateAbilityModifier = (value) => {
    switch (value) {
        case '8':
        case '9': return '-1';
        case '10':
        case '11': return '0';
        case '12':
        case '13': return '1';
        case '14':
        case '15': return '2';
        case '16':
        case '17': return '3';
        case '18':
        case '19': return '4';
        case '20':
        case '21': return '5';
        case '22': return '6';
        default: return '0';
    }
}

const handleAbilityScoreChange = (id, value) => {
    if (isNaN(value)) {
        data[id] = 0;
    } else {
        data[id] = value;
    }

    const abilityModDiv = document.getElementById
        (id.split('').reverse().splice(id.length - 3).reverse().join('') + 'abilityModifier');
    newAbilityMod = calculateAbilityModifier(value);
    abilityModDiv.innerHTML = newAbilityMod;
    handleArmorClassChange();
    handleSavingThrowChange();
    initialCalcs();
}

const handleFormSubmit = () => {
    console.log(data);
}

const createAbilityInput = (ability, stat) => {
    const abilityInput = document.createElement('input');
    abilityInput.id = ability + stat;
    abilityInput.style.width = '18%';
    abilityInput.type = 'number';
    abilityInput.step = '1';
    stat === 'abilityScore' ? abilityInput.min = '8' : null
    stat === 'abilityScore' ? abilityInput.max = '22' : null
    stat === 'abilityScore' ?
        abilityInput.setAttribute('onchange', 'handleAbilityScoreChange(this.id, this.value)') :
        abilityInput.setAttribute('onchange', 'handleChange(event)');
    return abilityInput;
}

const createAbilityModDiv = (ability) => {
    const newDiv = document.createElement('div');
    newDiv.id = ability + 'abilityModifier'
    newDiv.style.cssText = `
        width: 18%;
        border: 1px solid gray;
        text-align: center`;
    return newDiv;
}

const handleArmorClassChange = (id, value) => {
    if (isNaN(value)) {
        data[id] = 0;
    } else {
        data[id] = value;
    }

    data.armorClassTotal = 10 + parseInt(data.armorBonus) + parseInt(data.shieldBonus) +
        parseInt(calculateAbilityModifier(data.DEXabilityScore)) + parseInt(data.sizeModifier) + parseInt(data.naturalArmor) +
        parseInt(data.deflectionModifier) + parseInt(data.ACmiscModifier);

    document.getElementById('armorClassTotal').innerHTML = data.armorClassTotal
    document.getElementById('ACdexModifier').innerHTML = calculateAbilityModifier(data.DEXabilityScore);
}

const handleSavingThrowChange = () => {
    const savingThrowTotalArray = ['fortitude', 'reflex', 'will']
    const savingThrowAbilityModifierArray = ['fortitudeAbilityModifier', 'reflexAbilityModifier',
        'willAbilityModifier'];
    const savingThrowAssociatedAbilityArray = ['CONabilityScore', 'DEXabilityScore', 'WISabilityScore'];

    for (i = 0; i < savingThrowTotalArray.length; i++) {
        document.getElementById(savingThrowTotalArray[i] + 'SavingThrowTotal').innerHTML =
            parseInt(data[savingThrowTotalArray[i] + 'BaseSave']) +
            parseInt(calculateAbilityModifier(data[savingThrowAssociatedAbilityArray[i]])) +
            parseInt(data[savingThrowTotalArray[i] + 'MagicModifier']) + parseInt(data[savingThrowTotalArray[i] + 'MiscModifier']) +
            parseInt(data[savingThrowTotalArray[i] + 'TempModifier']);

        document.getElementById(savingThrowAbilityModifierArray[i]).innerHTML =
            calculateAbilityModifier(data[savingThrowAssociatedAbilityArray[i]]);
    }
}

const createWeaponSection = () => {
    const weaponLabelsArray = ['Weapon', 'Attack Bonus', 'Critical', 'Type', 'Range', 'Ammunition', 'Damage'];
    for (i = 0; i < 5; i++) {

        // line 1 of each weapon
        const newWeapLine1Id = document.getElementById('weapon' + i + 'Line1');

        const weaponLabel = createNewLabel('weapon-label');
        weaponLabel.innerHTML = 'Weapon';
        weaponLabel.append(createNewInput('weapon' + i + 'WeaponInput', 'weapon-input'));
        newWeapLine1Id.append(weaponLabel);

        const attackBonusLabel = createNewLabel('att-bonus-label');
        attackBonusLabel.innerHTML = 'Attack Bonus';
        attackBonusLabel.append(createNewInput('weapon' + i + 'AttackBonusInput', 'attack-bonus-input'));
        newWeapLine1Id.append(attackBonusLabel);

        const criticalLabel = createNewLabel('critical-label');
        criticalLabel.innerHTML = 'Critical';
        criticalLabel.append(createNewInput('weapon' + i + 'CriticalInput', 'critical-input'));
        newWeapLine1Id.append(criticalLabel);

        // line 2 of each weapon
        const weapLine2 = document.createElement('div');
        weapLine2.setAttribute('class', 'weapon-line2');
        const newWeapLine2Id = document.getElementById('weapon' + i + 'Line2');

        const typeLabel = createNewLabel('type-label');
        typeLabel.innerHTML = 'Type';
        typeLabel.append(createNewInput('weapon' + i + 'TypeInput', 'type-input'));
        newWeapLine2Id.append(typeLabel);

        const rangeLabel = createNewLabel('range-label');
        rangeLabel.innerHTML = 'Range';
        rangeLabel.append(createNewInput('weapon' + i + 'RangeInput', 'range-input'));
        newWeapLine2Id.append(rangeLabel);

        const ammunitionLabel = createNewLabel('ammunition-label');
        ammunitionLabel.innerHTML = 'Ammunition';
        ammunitionLabel.append(createNewInput('weapon' + i + 'AmmoInput', 'ammo-input'));
        newWeapLine2Id.append(ammunitionLabel);

        const damageLabel = createNewLabel('damage-label');
        damageLabel.innerHTML = 'Damage';
        damageLabel.append(createNewInput('weapon' + i + 'DamageInput', 'damage-input'));
        newWeapLine2Id.append(damageLabel);
    }
}

const createSkillsSection = () => {
    const skillsArray0 = ['Acrobatics', 'Appraise', 'Bluff', 'Climb'];
    const skillsArray1 = ['Craft1', 'Craft2', 'Craft3']
    const skillsArray2 = ['Diplomacy', 'Disable Device*', 'Disguise', 'Escape Artist', 'Fly', 'Handle Animal*',
        'Heal', 'Intimidate', 'Knowledge Aracana*', 'Knowledge Dungeoneering*', 'Knowledge Engineering*',
        'Knowledge Geography*', 'Knowledge History*', 'Knowledge Local*', 'Knowledge Nature*', 'Knowledge Nobility*',
        'Knowledge Planes*', 'Knowledge Religion*', 'Linguistics*', 'Perception'];
    const skillsArray3 = ['Perform1', 'Perform2', 'Profession1*', 'Profession2*'];
    const skillsArray4 = ['Ride', 'Sense Motive', 'Sleight of Hand*', 'Spellcraft*', 'Stealth', 'Survival',
        'Swim', 'Use Magical Device*'];
    const skillsAbilityArray0 = ['DEX', 'INT', 'CHA', 'STR'];
    const skillsAbilityArray1 = ['INT', 'INT', 'INT'];
    const skillsAbilityArray2 = ['CHA', 'DEX', 'CHA', 'DEX', 'DEX', 'CHA', 'WIS', 'CHA', 'INT', 'INT', 'INT',
        'INT', 'INT', 'INT', 'INT', 'INT', 'INT', 'INT', 'INT', 'WIS'];
    const skillsAbilityArray3 = ['CHA', 'CHA', 'WIS', 'WIS'];
    const skillsAbilityArray4 = ['DEX', 'WIS', 'DEX', 'INT', 'DEX', 'WIS', 'STR', 'CHA'];

    const createRegularSkillLine = (skillArray, abilityArray) => {
        for (i = 0; i < skillArray.length; i++) {
            console.log();

            const skillId = ('skill' + skillArray[i]).split(' ').join('').replace(/[^a-zA-Z ]/g, "");
            const skillSectionId = document.getElementById('skillsSection');
            const newSkillLine = createNewDiv(null, 'skill-line');

            const checkboxLabel = createNewLabel('checkbox-label');
            checkboxLabel.append(createCheckbox(skillId + 'Checkbox', 'skill-checkbox'));
            newSkillLine.append(checkboxLabel);

            const skillNameLabel = createNewLabel('skill-regular-name-label');
            skillNameLabel.append(createNewDiv(null, 'skill-name', skillArray[i]));
            newSkillLine.append(skillNameLabel);

            const skillTotalBonusLabel = createNewLabel('skill-total-bonus-label');
            skillTotalBonusLabel.append(createNewDiv(skillId + 'TotalBonus', 'skill-total-bonus div-border'));
            newSkillLine.append(skillTotalBonusLabel);

            newSkillLine.append(createNewSymbol('='));

            const skillAssocAbilityLabel = createNewDiv(null, 'skill-assoc-ability-label');
            skillAssocAbilityLabel.append(createNewDiv(null, 'skill-assoc-ability',
                abilityArray[i]));
            newSkillLine.append(skillAssocAbilityLabel);

            const skillAssocAbilityModLabel = createNewDiv(null, 'skill-assoc-ability-mod-label');
            skillAssocAbilityModLabel.append(createNewDiv(skillId + 'AssocAbilityMod', 'skill-assoc-ability-mod div-border'));
            newSkillLine.append(skillAssocAbilityModLabel);

            newSkillLine.append(createNewSymbol('+'));

            const skillRanksLabel = createNewDiv(null, 'skill-ranks-label');
            skillRanksLabel.append(createNewInput(skillId + 'Ranks', 'skill-ranks', 'number'));
            newSkillLine.append(skillRanksLabel);

            newSkillLine.append(createNewSymbol('+'));

            const skillMiscModLabel = createNewDiv(null, 'skill-misc-mod-label');
            skillMiscModLabel.append(createNewInput(skillId + 'Ranks', 'skill-misc-mod', 'number'));
            newSkillLine.append(skillMiscModLabel);

            skillSectionId.append(newSkillLine);
        }
    }

    const createCustomSkillLine = (skillArray, abilityArray) => {
        for (i = 0; i < skillArray.length; i++) {
            
            const skillId = ('skill' + skillArray[i]).split(' ').join('');
            const skillSectionId = document.getElementById('skillsSection');
            const newSkillLine = createNewDiv(null, 'skill-line');

            const checkboxLabel = createNewLabel('checkbox-label');
            checkboxLabel.append(createCheckbox(skillId + 'Checkbox', 'skill-checkbox'));
            newSkillLine.append(checkboxLabel);

            const skillNameLabel = createNewLabel('skill-custom-name-label');
            skillNameLabel.append(createNewDiv(null, 'skill-name', skillArray[i]));
            newSkillLine.append(skillNameLabel);

            const skillCustomNameLabel = createNewLabel('skill-custom-input-label');
            skillCustomNameLabel.append(createNewInput(skillId + 'CustomSkill', 'skill-name'));
            newSkillLine.append(skillCustomNameLabel);

            const skillTotalBonusLabel = createNewLabel('skill-total-bonus-label');
            skillTotalBonusLabel.append(createNewDiv(skillId + 'TotalBonus', 'skill-total-bonus div-border'));
            newSkillLine.append(skillTotalBonusLabel);

            newSkillLine.append(createNewSymbol('='));

            const skillAssocAbilityLabel = createNewDiv(null, 'skill-assoc-ability-label');
            skillAssocAbilityLabel.append(createNewDiv(skillId + 'AssocAbility', 'skill-assoc-ability',
                abilityArray[i]));
            newSkillLine.append(skillAssocAbilityLabel);

            const skillAssocAbilityModLabel = createNewDiv(null, 'skill-assoc-ability-mod-label');
            skillAssocAbilityModLabel.append(createNewDiv(skillId + 'AssocAbilityMod', 'skill-assoc-ability-mod div-border'));
            newSkillLine.append(skillAssocAbilityModLabel);

            newSkillLine.append(createNewSymbol('+'));

            const skillRanksLabel = createNewDiv(null, 'skill-ranks-label');
            skillRanksLabel.append(createNewInput(skillId + 'Ranks', 'skill-ranks', 'number'));
            newSkillLine.append(skillRanksLabel);

            newSkillLine.append(createNewSymbol('+'));

            const skillMiscModLabel = createNewDiv(null, 'skill-misc-mod-label');
            skillMiscModLabel.append(createNewInput(skillId + 'Ranks', 'skill-misc-mod', 'number'));
            newSkillLine.append(skillMiscModLabel);

            skillSectionId.append(newSkillLine);
        }
    }

    createRegularSkillLine(skillsArray0, skillsAbilityArray0);
    createCustomSkillLine(skillsArray1, skillsAbilityArray1);
    createRegularSkillLine(skillsArray2, skillsAbilityArray2);
    createCustomSkillLine(skillsArray3, skillsAbilityArray3);
    createRegularSkillLine(skillsArray4, skillsAbilityArray4);

}

const initialCalcs = () => {
    document.getElementById('initTotal').innerHTML = parseInt(data.initMiscModifier) +
        parseInt(calculateAbilityModifier(data.DEXabilityScore));

    document.getElementById('initDexModifier').innerHTML = calculateAbilityModifier(data.DEXabilityScore);

    const skillsArray = ['Acrobatics', 'Appraise', 'Bluff', 'Climb', 'Craft1', 'Craft2', 'Craft3', 'Diplomacy',
        'Disable Device*', 'Disguise', 'Escape Artist', 'Fly', 'Handle Animal*', 'Heal', 'Intimidate',
        'Knowledge Aracana*', 'Knowledge Dungeoneering*', 'Knowledge Engineering*', 'Knowledge Geography*',
        'Knowledge History*', 'Knowledge Local*', 'Knowledge Nature*', 'Knowledge Nobility*', 'Knowledge Planes*',
        'Knowledge Religion*', 'Linguistics*', 'Perception', 'Perform1', 'Perform2', 'Profession1*',
        'Profession2*', 'Ride', 'Sense Motive', 'Sleight of Hand*', 'Spellcraft*', 'Stealth', 'Survival',
        'Swim', 'Use Magical Device*'];
    const skillsAssocAbilityArray = ['DEX', 'INT', 'CHA', 'STR', 'INT', 'INT', 'INT', 'CHA', 'DEX', 'CHA', 'DEX',
        'DEX', 'CHA', 'WIS', 'CHA', 'INT', 'INT', 'INT', 'INT', 'INT', 'INT', 'INT', 'INT', 'INT', 'INT', 'INT',
        'WIS', 'CHA', 'CHA', 'WIS', 'WIS', 'DEX', 'WIS', 'DEX', 'INT', 'DEX', 'WIS', 'STR', 'CHA'];

    for (i = 0; i < skillsArray.length; i++) {
        skillId = 'skill' + skillsArray[i].split(' ').join('').replace(/[^a-zA-Z0-9]/g, '') + 'AssocAbilityMod';
        skillAssocAbilityScore = skillsAssocAbilityArray[i] + 'abilityScore';
        skillAssocAbilityId = document.getElementById(skillId);

        skillAssocAbilityId.innerHTML = calculateAbilityModifier(data[skillAssocAbilityScore]);
    }

}

$(document).ready(() => {

    const abilitiesSection = document.getElementById('abilities');

    abilitiesArray.forEach(ability => {
        const abilityLineDiv = document.createElement('div')
        abilityLineDiv.style.cssText = `
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;`;
        const abilityName = document.createElement('div');
        abilityName.style.cssText = `
            width: 18%;
            text-align: center`;
        abilityName.setAttribute('class', 'tag')
        abilityName.innerHTML = ability;
        abilityLineDiv.append(abilityName);
        abilityLineDiv.append(createAbilityInput(ability, 'abilityScore'));
        abilityLineDiv.append(createAbilityModDiv(ability));
        abilityLineDiv.append(createAbilityInput(ability, 'tempAdjustment'));
        abilityLineDiv.append(createAbilityInput(ability, 'tempModifier'));

        abilitiesSection.append(abilityLineDiv);
    })

    handleArmorClassChange();
    handleSavingThrowChange();
    createWeaponSection();
    createSkillsSection();
    initialCalcs();

})