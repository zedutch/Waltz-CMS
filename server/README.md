#Waltz Backend

##Localization
All object attributes that contain text that the end-user will read are localized. E.g. an attribute 'content' that has to be localized in English and Dutch, will be of the form:

	content = {
			'en' : {
					// English localized content
			},
			'nl' : {
					// Dutch localized content
			}
	}

If the `accept-language` header is set in a request, only the localized content for that locale will be unwrapped and returned. So, e.g. if a request for the object containing this content attribute contains a header with `accept-language = en`, the following will be returned:

	content = {
			// English localized content
	}

Since web browsers almost always automatically set the `accept-language` header, you can also add a header called `x-localize` and set it to `false` to disable this behaviour. You will then receive all localized attributes in the form containing all of their different localizations.  
**Beware:** setting the `x-localize` header to *anything* other than `false` won't disable localization and will have the exact same effect as omitting this header field entirely.