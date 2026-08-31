
// This module provides general util functions


/**
 * Provides tailwind lsp capabilities when passing css classes,
 * joins the css classes, and trims each class of whitespaces
 * 
 * Consumers are able to pass false values when working with conditionals.
 * Any false value will be skipped  
 */
export const cn = (...classNames: (string | false)[]): string => {

    let finalClassName: string = "";

    for(let className of classNames){
        if(className === false){
            continue;
        }
        finalClassName += className.trim() + " ";
    }

    return finalClassName.trim();
}

