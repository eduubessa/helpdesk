//
//  LoginView.swift
//  helpdesk
//
//  Created by Eduardo Bessa on 09/08/2021.
//

import SwiftUI

struct LoginView: View {
    var body: some View {
        WelcomeScreen()
    }
}

struct LoginView_Previews: PreviewProvider {
    static var previews: some View {
        LoginView().previewDevice("iPhone X")
        
    }
}

struct PrimaryButton: View {
    var title: String
    var body: some View {
        Text(title)
            .font(.title3)
            .fontWeight(.bold)
            .padding(.vertical)
            .frame(maxWidth: .infinity, alignment: /*@START_MENU_TOKEN@*/.center/*@END_MENU_TOKEN@*/)
            .background(Color.green)
            .foregroundColor(.white)
            .cornerRadius(50)

    }
}

struct SecundaryButton: View {
    var title: String
    var body: some View {
        Text(title)
            .font(.title3)
            .fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/)
            .frame(maxWidth: .infinity, alignment: .center)
            .background(Color.white)
            .foregroundColor(.green)
            .cornerRadius(50)
            .shadow(color: Color.black.opacity(0.08), radius: 60, x: 0.0, y: 16)
            .padding(.vertical)
    }
}
